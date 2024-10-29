export const fieldConfigurations = {
  textarea: {
    label: "Text Block",
    settings: [
      {
        name: "font",
        type: "select",
        label: "Font",
        gridSpan: "col-span-3", // Full width
        options: [
          { label: "Arial", value: "arial" },
          { label: "Time romans", value: "times_romans" },
          { label: "Calibri", value: "calibri" }
        ] 
      },
      {
        name: "type",
        type: "select",
        label: "Text type",
        gridSpan: "col-span-2", // Half width
        options: [
          { label: "Header", value: "header" },
          { label: "Paragraph", value: "paragraph" },
        ] 
      },
      {
        name: "size",
        type: "select",
        label: "Size",
        gridSpan: "col-span-1", // Half width
        options: [
          { label: "2", value: "2" },
          { label: "4", value: "4" },
          { label: "8", value: "8" }
        ] 
      },
      {
        name: "alignment",
        type: "select",
        label: "Align",
        gridSpan: "col-span-3", // Half width
        options: [
          { label: "Right", value: "right" },
          { label: "Left", value: "left" },
          { label: "Center", value: "center" }
        ] 
      },
    ],
    layout: "grid grid-cols-3 gap-4", // Define the grid layout for this configuration
  },
  email: {
    label: "Email",
    settings: [
      {
        name: "required",
        type: "switch",
        label: "Required",
      }
    ],
    layout: "flex flex-col space-y-4", // Flex layout for this configuration
  },
  dropdown: {
    label: "Dropdown",
    settings: [
      {
        name: "required",
        type: "switch",
        label: "Required",
        gridSpan: "col-span-1"
      },
    ],
    layout: "flex flex-col space-y-4", // Flex layout for this configuration
  },
  phone: {
    label: "Phone",
    settings: [
      {
        name: "required",
        type: "switch",
        label: "Required",
        gridSpan: "col-span-1",
      },
      {
        name: "disabled",
        type: "switch",
        label: "Disabled",
        gridSpan: "col-span-1",
      },
    ],
    layout: "flex flex-col space-y-4", // Flex layout for this configuration
  },
  date: {
    label: "Date format",
    settings: [
      {
        name: "required",
        type: "switch",
        label: "Required",
        gridSpan: "col-span-1",
      },
      {
        name: "date",
        type: "select",
        label: "Date format",
        gridSpan: "col-span-1",
        options: [
          { label: "mm/dd/yy", value: "mm/dd/yy" },
          { label: "dd/mm/yy", value: "dd/mm/yy" },
          { label: "yy/dd/mm", value: "yy/dd/mm" }
        ] 
      },
    ],
    layout: "flex flex-col space-y-4", // Flex layout for this configuration
  },
  website: {
    label: "Website",
    settings: [
      {
        name: "required",
        type: "switch",
        label: "Required",
        gridSpan: "col-span-1",
      },
    ],
    layout: "flex flex-col space-y-4", // Flex layout for this configuration
  },
  upload: {
    label: "File upload",
    settings: [
      {
        name: "required",
        type: "switch",
        label: "Required",
        gridSpan: "col-span-1",
      },
      {
        name: "image",
        type: "switch",
        label: "Image",
        gridSpan: "col-span-1",
      },
      {
        name: "video",
        type: "switch",
        label: "Video",
        gridSpan: "col-span-1",
      },
      {
        name: "any",
        type: "switch",
        label: "Any",
        gridSpan: "col-span-1",
      },
      {
        name: "limit",
        type: "switch",
        label: "Size limit",
        gridSpan: "col-span-1",
      },
    ],
    layout: "flex flex-col space-y-4", // Flex layout for this configuration
  },
  // Add more field types here...
};

