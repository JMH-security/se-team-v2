import React, { useState, useEffect } from 'react';
import { entityConfig } from './entityConfig';
import styles from './AddEditForm.module.css'; // Import the CSS module
import { capitalizeFirstLetter } from '@/helpers/capitalizeFirstLetter';
import { capitalizeAndSingularize } from '@/helpers/capitalizeAndSingularize';

type EditItemPageProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  entity: any;
  activeSection: string;
  headers: string[];
  handleClickBack: () => void
};

const EditItemPage: React.FC<EditItemPageProps> = ({ entity, activeSection, headers, handleClickBack }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [formData, setFormData] = useState<any>(entity || {});
  const { endpointUrl } = entityConfig[activeSection];

  useEffect(() => {
    if (entity) {
      setFormData(entity);
    }
  }, [entity]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(endpointUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      console.log('URL Endpoing', endpointUrl);
      if (response.ok) {
        handleClickBack();
      } else {
        console.error('Failed to update item');
      }
    } catch (error) {
      console.error('Error submitting form', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h1>Edit {capitalizeAndSingularize(activeSection)} {entity.id}</h1>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          {headers.map((header) => (
            
            //header !== 'id' && (
              (<div key={header} className={styles.formGroup}>
                <label htmlFor={header} className={styles.formLabel}>{header}</label>
                <input
                  type="text"
                  id={header}
                  name={header}
                  className={styles.formInput}
                  value={formData[header] || ''}
                  onChange={handleChange}
                  required
                />
              </div>
            )
          ))}
          <button type="submit" className={styles.submitButton}>Update</button>
          <button
            type="button"
            className={styles.backButton}
            onClick={() => handleClickBack()}
          >
            Back to {capitalizeFirstLetter(activeSection)}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditItemPage;
