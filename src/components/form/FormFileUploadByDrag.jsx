import { useFormContext } from 'react-hook-form';
import FileUploadByDrag from '../upload/FileUploadByDrag';

const FormFileUploadByDrag = ({
  name,
  type,
  onChange,
  setFormattedValue,
  multiple,
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
    onChange(multiple ? selectedFiles : selectedFiles?.[0]);
  };

  return (
    <div>
      <input type='file' className='hidden' {...register(name)} />
      <FileUploadByDrag
        type={type}
        multiple={multiple}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default FormFileUploadByDrag;
