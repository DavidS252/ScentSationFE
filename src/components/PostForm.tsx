import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

const schema = z.object({
    title: z.string()
        .nonempty({ message: 'Title is required' })
        .min(3, { message: 'Title must be at least 3 characters long' }),
    age: z.number({ invalid_type_error: 'Age is requiered' })
        .min(18, "You must be at least 18 years old"),
});

type FormData = z.infer<typeof schema>;

const PostForm: FC = () => {
    const { register, handleSubmit, formState } = useForm<FormData>({ resolver: zodResolver(schema) });

    const onSubmit = (data: FormData) => {
        console.log(data)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='m-3'>
                <label htmlFor="title" className='form-label'>Title</label>
                <input {...register('title')} type="text" id="title" name="title" className='form-control' />
                {formState.errors.title && <p className='text-danger'>{formState.errors.title?.message}</p>}

                <label htmlFor="age" className='form-label'>Age</label>
                <input {...register('age', { valueAsNumber: true })} type="number" id="age" name="age" className='form-control' />
                {formState.errors.age && <p className='text-danger'>{formState.errors.age?.message}</p>}

                <button type="submit" className='btn btn-primary mt-3'>Submit</button>
            </div>
        </form>
    )
}

export default PostForm;