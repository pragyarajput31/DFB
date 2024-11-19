import React from "react";
import { useForm } from "react-hook-form";

// Define types for the schema
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

interface FormGeneratorProps {
  schema: string;
}

const FormGenerator: React.FC<FormGeneratorProps> = ({ schema }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {
    console.log("Form Submitted:", data);
  };

  let parsedSchema: JSONSchema | null = null;
  try {
    parsedSchema = JSON.parse(schema);
  } catch {
    return (
      <div className="flex items-center justify-center p-4 bg-red-100 text-red-700 rounded-lg">
        Invalid JSON Schema
      </div>
    );
  }

  // Add a null check for `parsedSchema`
  if (!parsedSchema) {
    return (
      <div className="flex items-center justify-center p-4 bg-yellow-100 text-yellow-700 rounded-lg">
        Invalid or missing schema
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Main responsive container */}
      <div className="max-w-4xl w-full mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
          {parsedSchema.formTitle}
        </h2>
        <p className="text-gray-600 mb-6">{parsedSchema.formDescription}</p>

        {/* Responsive form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {parsedSchema.fields.map((field) => (
            <div key={field.id} className="space-y-2">
              {/* Field label */}
              <label
                htmlFor={field.id}
                className="block text-sm font-medium text-gray-700"
              >
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>

              {/* Field input */}
              <div className="relative">
                {field.type === "select" ? (
                  <div className="relative">
                    <select
                      id={field.id}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                      {...register(field.id, { required: field.required })}
                    >
                      {field.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {/* Fixed Dropdown Icon */}
                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                ) : (
                  <input
                    id={field.id}
                    type={field.type}
                    placeholder={field.placeholder || ""}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register(field.id, { required: field.required })}
                  />
                )}
                {/* Error message */}
                {errors[field.id] && (
                  <p className="text-sm text-red-500">
                    {field.validation?.message || "This field is required"}
                  </p>
                )}
              </div>
            </div>
          ))}

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormGenerator;
