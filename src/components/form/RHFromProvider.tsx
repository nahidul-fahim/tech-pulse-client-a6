import { ReactNode } from "react";
import { FieldValues, FormProvider, SubmitHandler, useForm, UseFormProps } from "react-hook-form";

type TFormProps = {
    onSubmit: SubmitHandler<FieldValues>;
    children: ReactNode;
    className?: string;
    defaultValues?: FieldValues;
    formOptions?: Omit<UseFormProps, 'defaultValues'>;
}

const RHFormProvider = ({ onSubmit, children, className, defaultValues, formOptions }: TFormProps) => {
    const methods = useForm({
        ...formOptions,
        defaultValues,
    });

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className={className}>
                {children}
            </form>
        </FormProvider>
    );
};

export default RHFormProvider;