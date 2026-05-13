
import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const QuillEditor = ({ value, onChange }) => {
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['link', 'image', 'code-block'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet',
    'link', 'image', 'code-block'
  ];

  return (
    <div className="quill-editor-container bg-white rounded-xl overflow-hidden border border-gray-200 focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500">
      <style>{`
        .quill-editor-container .ql-toolbar.ql-snow {
          border: none;
          border-bottom: 1px solid #e5e7eb;
          background-color: #f9fafb;
          padding: 12px;
          border-top-left-radius: 0.75rem;
          border-top-right-radius: 0.75rem;
        }
        .quill-editor-container .ql-container.ql-snow {
          border: none;
          min-height: 300px;
          font-size: 1rem;
          font-family: inherit;
        }
        .quill-editor-container .ql-editor {
          min-height: 300px;
          padding: 1rem;
        }
        .quill-editor-container .ql-editor.ql-blank::before {
          color: #9ca3af;
          font-style: normal;
        }
      `}</style>
      <ReactQuill 
        theme="snow" 
        value={value || ''} 
        onChange={onChange} 
        modules={modules}
        formats={formats}
        placeholder="Nhập nội dung bài viết tại đây..."
      />
    </div>
  );
};

export default QuillEditor;
