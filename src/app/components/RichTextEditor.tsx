import React, { useEffect, useState, useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { AlertCircle, Check } from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxWords?: number;
  minWords?: number;
  showWordCount?: boolean;
  label?: string;
  required?: boolean;
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = 'Enter description...',
  maxWords = 250,
  minWords = 0,
  showWordCount = true,
  label,
  required = false
}: RichTextEditorProps) {
  const [wordCount, setWordCount] = useState(0);
  const [isOverLimit, setIsOverLimit] = useState(false);

  // Calculate word count from plain text (excluding HTML tags)
  useEffect(() => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = value;
    const plainText = tempDiv.textContent || tempDiv.innerText || '';
    const words = plainText.trim().split(/\s+/).filter(word => word.length > 0);
    const count = words.length;
    setWordCount(count);
    setIsOverLimit(count > maxWords);
  }, [value, maxWords]);

  const modules = useMemo(() => ({
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link'],
      ['clean']
    ],
  }), []);

  const formats = [
    'header',
    'bold', 'italic', 'underline',
    'list', 'bullet',
    'link'
  ];

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-slate-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      <div className="relative">
        <ReactQuill
          theme="snow"
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          placeholder={placeholder}
          className="bg-white rounded-lg"
          style={{
            minHeight: '200px'
          }}
        />
      </div>

      {showWordCount && (
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            {isOverLimit ? (
              <div className="flex items-center gap-1 text-amber-600">
                <AlertCircle className="w-3 h-3" />
                <span>Mô tả vượt quá {maxWords} từ, vui lòng rút gọn</span>
              </div>
            ) : wordCount >= minWords && minWords > 0 ? (
              <div className="flex items-center gap-1 text-green-600">
                <Check className="w-3 h-3" />
                <span>Meets minimum requirement</span>
              </div>
            ) : minWords > 0 ? (
              <span className="text-slate-500">
                Minimum {minWords} words required
              </span>
            ) : null}
          </div>
          
          <span className={`font-medium ${
            isOverLimit ? 'text-amber-600' : 
            wordCount < minWords && minWords > 0 ? 'text-red-600' : 
            'text-slate-600'
          }`}>
            {wordCount}/{maxWords} words
          </span>
        </div>
      )}
    </div>
  );
}
