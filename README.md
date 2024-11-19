## Dynamic Form Generator
## Description
The Dynamic Form Generator is a React application that creates forms dynamically based on a given JSON schema. It features a dual-pane interface, allowing users to edit the schema on one side and instantly view the corresponding form on the other. The application prioritizes responsiveness, form validation, and an intuitive user experience.

## Setup Instructions
1. Clone the repository.
2. Install dependencies
3. Start the development server

## Example JSON Schema
{

  "formTitle": "Project Requirements Survey",

  "formDescription": "Please fill out this survey about your project needs",

  "fields": [

    {

      "id": "name",

      "type": "text",

      "label": "Full Name",

      "required": true,

      "placeholder": "Enter your full name"

    },

    {

      "id": "email",

      "type": "email",

      "label": "Email Address",

      "required": true,

      "placeholder": "you@example.com",

      "validation": {

        "pattern": "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",

        "message": "Please enter a valid email address"

      }
      ]

    }

## Testing
The application includes testing for:
-JSON validation and error scenarios.
-Form validation and submission.
-Responsiveness and real-time updates.


