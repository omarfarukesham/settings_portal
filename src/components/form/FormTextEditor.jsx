import { useRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const FormTextEditor = ({ name }) => {
  const quillRef = useRef(null);

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'bullet',
    'indent',
    'link',
  ];

  const { register, control } = useFormContext();

  const Editor = ({ field }) => (
    <div>
      <input className='hidden' {...register(name)} />
      <ReactQuill
        theme='snow'
        ref={quillRef}
        value={field.value}
        onChange={field.onChange}
        modules={modules}
        formats={formats}
        className='editor'
      />
    </div>
  );
  return <Controller control={control} render={Editor} name={name} />;
};

export default FormTextEditor;
