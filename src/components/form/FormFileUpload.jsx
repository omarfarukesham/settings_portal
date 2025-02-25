import { useFormContext } from 'react-hook-form';
import FileUpload from '../upload/FileUpload';

const FormFileUpload = ({
  name,
  onChange,
  setFormattedValue,
  accept,
  multiple,
  label,
  ...rest
}) => {
  const { register, setValue } = useFormContext();

  const handleFileChange = (selectedFiles) => {
    let fileToSetOnForm;

    if (setFormattedValue) {
      fileToSetOnForm = setFormattedValue(selectedFiles);
    } else if (!multiple) {
      fileToSetOnForm = selectedFiles?.[0];
    } else {
      fileToSetOnForm = selectedFiles;
    }

    setValue(name, fileToSetOnForm);
    if (onChange) onChange(multiple ? selectedFiles : selectedFiles?.[0]);
  };

  return (
    <div>
      <input type='file' className='hidden' {...register(name)} />
      <FileUpload
        label={label}
        accept={accept}
        multiple={multiple}
        onChange={handleFileChange}
        {...rest}
      />
    </div>
  );
};

export default FormFileUpload;
