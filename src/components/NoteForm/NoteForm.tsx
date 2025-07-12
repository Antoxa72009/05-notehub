import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import css from './NoteForm.module.css';
import type { NoteTag } from '../../types/note';

interface NoteFormProps {
  onSubmit: (values: NoteFormValues) => void;
  onCancel: () => void;
}

export interface NoteFormValues {
  title: string;
  content: string;
  tag: NoteTag;
}

const initialValues: NoteFormValues = {
  title: '',
  content: '',
  tag: 'Todo',
};

const validationSchema = Yup.object({
  title: Yup.string().min(3).max(50).required('Title is required'),
  content: Yup.string().max(500),
  tag: Yup.mixed<NoteTag>().oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping']).required(),
});

const NoteForm = ({ onSubmit, onCancel }: NoteFormProps) => {
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ isSubmitting, isValid }) => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <Field name="title" id="title" type="text" className={css.input} />
            <ErrorMessage name="title" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <Field as="textarea" name="content" id="content" rows="8" className={css.textarea} />
            <ErrorMessage name="content" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <Field as="select" name="tag" id="tag" className={css.select}>
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
            <ErrorMessage name="tag" component="span" className={css.error} />
          </div>

          <div className={css.actions}>
            <button type="button" onClick={onCancel} className={css.cancelButton}>Cancel</button>
            <button type="submit" className={css.submitButton} disabled={!isValid || isSubmitting}>
              Create note
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default NoteForm;