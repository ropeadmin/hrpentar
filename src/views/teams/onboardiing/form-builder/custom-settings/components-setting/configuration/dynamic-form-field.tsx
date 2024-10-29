import { FormField } from "@/components/custom-inputs/custom-inputs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ReactNode } from "react";

export function DynamicFormField({
  settings,
  register,
  fieldSettings,
  onSettingsUpdate,
  fieldId
}: {
  settings: { name: string; label: string; type: string; gridSpan?: string, options?: {label: string; value: string; image?: string | undefined; icon?: ReactNode}[] }[]
  register: any,
  fieldSettings: Record<string, any>,
  onSettingsUpdate: (name: string, value: any) => void;
  fieldId: string | null;
}) {
  return (
    <>
      {settings.map((setting, index) => (
        <div key={index} className={setting.gridSpan || "col-span-1"}>
          {/* Render the appropriate field based on the type */}
          {setting.type === "switch" && (
            <div className="flex items-center justify-between">
              <Label htmlFor={setting.name}>{setting.label}</Label>
              <Switch  
                {...register(setting.name)} 
                id={setting.name} 
                checked={fieldSettings?.[setting.name] || false}
                onCheckedChange={(checked) => {
                  if (fieldId === null) return ;
                  onSettingsUpdate(fieldId, {
                    ...fieldSettings, // Spread the current settings for the field
                    [setting.name]: checked, // Update the specific setting
                  })
                }}
              />
            </div>
          )}
          {setting.type === "select" && (
            <div className="">
              <FormField
                label={setting.label}
                options={setting?.options} 
                name={setting.name} 
                type={setting.type}              
              />
            </div>
          )}
          {setting.type === "toggle" && (
            <div>
              <label>{setting.label}</label>
              <input type="" {...register(setting.name)} />
            </div>
          )}
          {/* Handle other field types like input, text area, etc. */}
        </div>
      ))}
    </>
  )
}

