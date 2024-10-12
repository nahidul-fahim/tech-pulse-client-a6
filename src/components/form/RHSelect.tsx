import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type TSelectFieldProps = {
    name: string;
    options: string[];
    placeholder?: string;
    label?: string;
    className?: string;
}

const RHSelect: React.FC<TSelectFieldProps> = ({ name, options, placeholder, label, className }) => {
    const { control } = useFormContext();

    return (
        <div className="space-y-2">
            {label && <label htmlFor={name}>{label}</label>}
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className={className}>
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                            {options.map((option) => (
                                <SelectItem key={option} value={option}>
                                    {option}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}
            />
        </div>
    );
};

export default RHSelect;