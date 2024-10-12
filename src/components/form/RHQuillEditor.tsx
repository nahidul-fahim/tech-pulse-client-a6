/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Controller, useFormContext } from "react-hook-form";
import dynamic from 'next/dynamic';

type TInputProps = {
    content: string;
    name: string;
    label?: string;
    className?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
}

const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading Editor...</p>,
  });

const RHQuillEditor = ({ content, name, label, className }: TInputProps) => {
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link'],
            ['clean']
        ],
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'link'
    ];

    const { control } = useFormContext();

    return (
        <div className="space-y-2">
            {label && <label htmlFor={name}>{label}</label>}
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange, value } }) => (
                    <ReactQuill
                        theme="snow"
                        value={value || ''}
                        modules={modules}
                        formats={formats}
                        onChange={(content) => onChange(content)}
                        className={className}
                    />
                )}
            />
        </div>
    );
};

export default React.memo(RHQuillEditor);