'use client';

import { useEffect, useState, useRef } from 'react';
import styles from '@/components/wt/page.module.css';
import { entityConfig } from '@/components/wt/entityConfig';
import EditItemPage from '@/components/wt/EditItemPage';
import NewItemPage from '@/components/wt/NewItemPage';

const Page = () => {
  type EntityItem = {
    _id: string;
    id: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  };

  type Selections = 'regions' | 'branches' | 'supervisors' | 'services' | 'salestaxstateid';

  const [activeSection, setActiveSection] = useState<Selections>('regions');
  const [items, setItems] = useState<Array<EntityItem>>([]);
  const [searchText, setSearchText] = useState('');
  const [headers, setHeaders] = useState<string[]>([]); // to store dynamic headers
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false); // state to toggle sidebar
  const [selectedItem, setSelectedItem] = useState<EntityItem | null>(null); // Store selected item for Edit
  const [isAddNew, setIsAddNew] = useState(false); // State to track if "Add New" is clicked

  const thRefs = useRef<(HTMLTableHeaderCellElement | null)[]>([]); // Refs for th elements

  const fetchItems = async () => {
    const mongoEntityName = entityConfig[activeSection].mongoEntityName;

    const res = await fetch(`http://localhost:3000/api/admin/wt/${mongoEntityName}`, {
      method: 'GET',
      headers: {},
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch ${mongoEntityName} data`);
    }
    const data = await res.json();
    console.log("data: ", data)
    setItems(data);

    if (data.length > 0) {
      // Extract keys dynamically from the first item
      const dynamicHeaders = Object.keys(data[0]);
      console.log("dynamicHeaders: ", dynamicHeaders)
      setHeaders(dynamicHeaders);
    }
  }

  useEffect(() => {
    (async () => {
      await fetchItems()
    })();
  }, [activeSection]);

  const handleSectionChange = (section: Selections) => {
    setActiveSection(section);
    setSelectedItem(null);
    setIsAddNew(false);
  };

  const handleEdit = (id: number) => {
    const itemToEdit = items.find(item => item.id === id) || null;
    setSelectedItem(itemToEdit);
    setIsAddNew(false);
  };

  const handleDelete = async (id: number) => {
    await fetch(entityConfig[activeSection].endpointUrl, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })

    await fetchItems();
  };

  const handleAddNew = () => {
    setSelectedItem(null);
    setIsAddNew(true);
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const handleClickBack = async () => {
    setIsAddNew(false);
    setSelectedItem(null);
    await fetchItems();
  }

  const renderFormComponent = () => {
    if (isAddNew) {
      return <NewItemPage handleClickBack={handleClickBack} headers={headers} activeSection={activeSection} />;
    }
    if (selectedItem) {
      return <EditItemPage handleClickBack={handleClickBack} headers={headers} entity={selectedItem} activeSection={activeSection} />;
    }
    return null;
  };

  // Column resizing logic
  const handleMouseDown = (index: number, e: React.MouseEvent) => {
    const th = thRefs.current[index];
    if (!th) return;

    const startX = e.clientX;
    const startWidth = th.offsetWidth;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const diff = moveEvent.clientX - startX;
      th.style.width = `${startWidth + diff}px`;
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  return (
    <div className={styles.container}>
      {/* Navbar with Hamburger Menu */}
      <nav className={`${styles.navbar} ${isSidebarCollapsed ? styles.collapsed : ''}`}>
        <div className={styles.hamburgerMenu} onClick={() => setSidebarCollapsed(prev => !prev)}>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </div>
        <ul className={`${styles.navList} ${isSidebarCollapsed ? styles.collapsedList : ''}`}>
          <li onClick={() => handleSectionChange('regions')} className={activeSection === 'regions' ? styles.active : ''}>Regions</li>
          <li onClick={() => handleSectionChange('branches')} className={activeSection === 'branches' ? styles.active : ''}>Branches</li>
          <li onClick={() => handleSectionChange('supervisors')} className={activeSection === 'supervisors' ? styles.active : ''}>Supervisors</li>
          <li onClick={() => handleSectionChange('services')} className={activeSection === 'services' ? styles.active : ''}>Services</li>
          <li onClick={() => handleSectionChange('salestaxstateid')} className={activeSection === 'salestaxstateid' ? styles.active : ''}>Sales Tax State</li>
        </ul>
      </nav>

      {/* Content Section */}
      <main className={styles.mainContent}>
        {isAddNew || selectedItem ? null : (
          <header className={styles.header}>
            <button className={styles.addButton} onClick={handleAddNew}>Add New</button>
            <input className={styles.searchBar} value={searchText} onChange={(e) => handleSearch(e.target.value)} placeholder="Search" />
          </header>
        )}

        <div className={styles.tableContainer}>
          {isAddNew || selectedItem ? (
            <div>
              {renderFormComponent()}
            </div>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  {headers.map((header, index) => (
                    <th
                      key={header}
                      ref={(el) => { thRefs.current[index] = el; }}
                      onMouseDown={(e) => handleMouseDown(index, e)}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.filter(item => {
                  return Object.values(item).some(val =>
                    String(val).toLowerCase().includes(searchText.toLowerCase())
                  );
                }).map((item) => (
                  <tr key={item.id}>
                    {headers.map((header) => (
                      <td key={header}>{item[header]}</td>
                    ))}
                    <td className={styles.actions}>
                      <button onClick={() => handleEdit(item.id)}>Edit</button>
                      <button className={styles.deleteButton} onClick={() => handleDelete(item.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
};

export default Page;
