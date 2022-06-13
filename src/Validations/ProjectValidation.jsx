import * as yup from 'yup'

export const projectSchema = yup.object().shape({
    projectTitle: yup.string().required("Title is required"),
    projectDescription: yup.string().required("Description is required"), 
    dueDate: yup.date("Date is required").min(new Date(Date.now()), "Date must be greater than today").required("Due Date is required").nullable("Date is required").default(undefined)
});