import React, { useState, useEffect } from 'react';
import { entityConfig } from './entityConfig';
import styles from '@/components/wt/AddEditForm.module.css'; // Import the CSS module
import { capitalizeFirstLetter } from '@/helpers/capitalizeFirstLetter';
import { capitalizeAndSingularize } from '@/helpers/capitalizeAndSingularize';

type NewItemPageProps = {
  activeSection: string;
  headers: string[]; // Dynamic headers passed from the main page
  handleClickBack: () => void,
};

const NewItemPage: React.FC<NewItemPageProps> = ({ activeSection, headers, handleClickBack }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [formData, setFormData] = useState<any>({});
  const { endpointUrl } = entityConfig[activeSection];

  useEffect(() => {
    // Initialize form data with empty values for each header (excluding 'id')
    const initialFormData = headers.reduce((acc, header) => {
        acc[header] = '';
      return acc;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }, {} as any);
    setFormData(initialFormData);
  }, [headers]);

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
      if (response.ok) {
        handleClickBack();
      } else {
        console.error('Failed to add item');
      }
    } catch (error) {
      console.error('Error submitting form', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h1>Add New {capitalizeAndSingularize(activeSection)}</h1>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          {headers.map((header) => (
              <div key={header} className={styles.formGroup}>
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
          ))}
          <button type="submit" className={styles.submitButton}>Submit</button>
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

export default NewItemPage;
