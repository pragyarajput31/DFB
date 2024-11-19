import React from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faCheck, faChevronDown, faCopy } from "@fortawesome/free-solid-svg-icons";





interface FieldSchema {
  id: string;
  type: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  validation?: {
    pattern?: string;
    message?: string;
  };
}

interface JSONSchema {
  formTitle: string;
  formDescription: string;
  fields: FieldSchema[];
}

interface FormPreviewProps {
  schema: string;
}

const FormPreview: React.FC<FormPreviewProps> = ({ schema }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {
    console.log("Form Submitted:", data);
  };

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(schema)
      .then(() => {
        alert("Form JSON copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy JSON:", err);
      });
  };

  let parsedSchema: JSONSchema | null = null;
  try {
    parsedSchema = JSON.parse(schema);
  } catch (error) {
    console.error("Error parsing schema:", error);
    return (
      <div className="flex items-center justify-center p-4 bg-red-100 text-red-700 rounded-lg">
        Invalid JSON Schema
      </div>
    );
  }

  if (!parsedSchema) {
    return (
      <div className="flex items-center justify-center p-4 bg-yellow-100 text-yellow-700 rounded-lg">
        No valid schema provided
      </div>
    );
  }

  return (
    <div className="w-full md:w-1/2 p-8 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-lg">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4 relative">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
          {parsedSchema.formTitle}
        </h2>
        <br /><br /> <br /><br /><br />
        <div className="flex gap-1">
        <button
            onClick={handleCopyJSON}
            className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <FontAwesomeIcon icon={faCopy} />
            <span>Copy JSON</span>
          </button>
          
        </div>
      </div>
      
      {/* Form Description */}
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        {parsedSchema.formDescription}
      </p>

      {/* Form Fields */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {parsedSchema.fields.map((field) => (
          <div key={field.id} className="space-y-2">
            <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="relative">
              {field.type === "select" ? (
                <>
                  <select
                    id={field.id}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
                    {...register(field.id, { required: field.required })}
                  >
                    {field.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400"
                  />
                </>
              ) : (
                <>
                  <input
                    id={field.id}
                    type={field.type}
                    placeholder={field.placeholder || ""}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
                    {...register(field.id, { required: field.required })}
                  />
                  <FontAwesomeIcon
                    icon={field.id === "email" ? faEnvelope : faUser}
                    className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400"
                  />
                </>
              )}
              {errors[field.id] && (
                <p className="text-sm text-red-500">
                  {field.validation?.message || "This field is required"}
                </p>
              )}
            </div>
          </div>
        ))}
        <button
          type="submit"
          className="w-full flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <FontAwesomeIcon icon={faCheck} className="mr-2" />
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormPreview;
