import React, { useState } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import '../../styles/filter.css';
import { SubmitHandler, useForm } from 'react-hook-form';
import NoConnection from '../NoConnection/NoConnection';
import Loading from '../Loading/Loading';
import { useParams } from 'react-router-dom';
import { UserPreviewProps } from '../UserPreview/UserPreview';
import UserPreviewList from '../UserPreview/UserPreviewList';

export interface TeacherFilterFormInput {
  firstName: string;
  lastName: string;
}

const SubjectAddTeacherPage = () => {
  const [error, setError] = useState<AxiosError>();
  const [loading, setLoading] = useState(false);
  const [teachers, setTeachers] = useState<UserPreviewProps[]>([]);
  const { register, handleSubmit } = useForm<TeacherFilterFormInput>();
  const { id } = useParams();

  const onSubmit: SubmitHandler<TeacherFilterFormInput> = (
    data: TeacherFilterFormInput,
  ) => {
    setLoading(true);
    axios
      .post(`subjects/${id}/teachers`, {
        ...data,
      })
      .then((response: AxiosResponse<UserPreviewProps[]>) => {
        const teachers: UserPreviewProps[] = response.data;
        setTeachers(teachers);
        setLoading(false);
      })
      .catch((error_) => {
        setError(error_);
      });
  };

  return (
    <main className="main-content">
      <div className="main-content-container">
        <h1 className="filter-header">Add teacher:</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="filter-container">
          <div className="filter">
            <div className="filter__input-container">
              <input
                className="filter__field"
                placeholder="First Name"
                type="text"
                {...register('firstName', {
                  required: false,
                })}
              />
            </div>
            <div className="filter__input-container">
              <input
                className="filter__field"
                placeholder="Last Name"
                type="text"
                {...register('lastName', {
                  required: false,
                })}
              />
            </div>
          </div>
          <button className="filter__submit" type="submit">
            Filter
          </button>
        </form>
        {error && <NoConnection />}
        {loading && <Loading />}
        {!loading && !error && (
          <UserPreviewList title={'Available teachers:'} users={teachers} />
        )}
      </div>
    </main>
  );
};
export default SubjectAddTeacherPage;
