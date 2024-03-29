import React, { useEffect, useState } from 'react';
import '../../styles/teacherList.css';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useParams } from 'react-router-dom';
import NoConnection from '../NoConnection/NoConnection';
import StudentPreview, { StudentPreviewProps } from './StudentPreview';

export interface StudentPreviewListProps {
  title: string;
  canEdit?: boolean;
  students: StudentPreviewProps[];
  setStudents: React.Dispatch<React.SetStateAction<StudentPreviewProps[]>>;
}

const StudentPreviewList = ({
  title,
  students,
  setStudents,
  canEdit,
}: StudentPreviewListProps) => {
  const { id } = useParams();
  const [deleteError, setDeleteError] = useState<AxiosError>();
  const [hasStudents, setHasStudents] = useState<boolean>(false);

  useEffect(() => {
    setHasStudents(students.length > 0);
  }, [students]);

  function onRemove(studentId: number) {
    axios
      .delete(`seminar-group/${id}/student`, {
        data: {
          studentId: studentId,
        },
      })
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          setStudents(students.filter((t) => t.id != studentId));
        }
      })
      .catch((deleteError_) => {
        setDeleteError(deleteError_);
      });
  }

  return (
    <div className="teacher">
      <span className="teacher__header">{title}</span>
      {hasStudents && (
        <ul className="teacher__list">
          {students.map((s) => (
            <StudentPreview
              key={s.id}
              student={s}
              canEdit={canEdit}
              onRemove={onRemove}
            />
          ))}
        </ul>
      )}
      {!hasStudents && (
        <div className="info">This seminar has no students.</div>
      )}

      {deleteError && <NoConnection />}
    </div>
  );
};

export default StudentPreviewList;
