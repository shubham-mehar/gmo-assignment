import { useState } from 'react';
import { Checkbox, Collapse, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const departmentsData = [
  {
    department: 'customer_service',
    sub_departments: ['support', 'customer_success'],
  },
  {
    department: 'design',
    sub_departments: ['graphic_design', 'product_design', 'web_design'],
  },
];

const DepartmentList = () => {
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);

  const handleToggle = (department: string) => {
    const currentIndex = selectedDepartments.indexOf(department);
    const newSelected = [...selectedDepartments];

    if (currentIndex === -1) {
      newSelected.push(department, ...departmentsData.find((dep) => dep.department === department)?.sub_departments);
    } else {
      newSelected.splice(currentIndex, 1);
      newSelected.splice(
        newSelected.indexOf(department),
        departmentsData.find((dep) => dep.department === department)?.sub_departments?.length || 0
      );
    }

    setSelectedDepartments(newSelected);
  };

  const handleSelectAllSubDepartments = (department: string, subDepartments: string[]) => {
    const allSelected = subDepartments.every((subDep) => selectedDepartments.includes(subDep));

    let newSelected = [...selectedDepartments];

    if (allSelected) {
      newSelected = newSelected.filter((subDep) => !subDepartments.includes(subDep));
    } else {
      newSelected = [...newSelected, ...subDepartments];
    }

    handleToggle(department);

    setSelectedDepartments(newSelected);
  };

  return (
    <List>
      {departmentsData.map((dep) => (
        <div key={dep.department}>
          <ListItem button onClick={() => handleToggle(dep.department)}>
            <ListItemIcon>
              <Checkbox
                icon={<CheckBoxOutlineBlankIcon />}
                checkedIcon={<CheckBoxIcon />}
                edge="start"
                checked={selectedDepartments.includes(dep.department)}
                indeterminate={
                  !selectedDepartments.includes(dep.department) &&
                  dep.sub_departments.some((subDep) => selectedDepartments.includes(subDep))
                }
              />
            </ListItemIcon>
            <ListItemText primary={dep.department} />
            {selectedDepartments.includes(dep.department) ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItem>
          <Collapse in={selectedDepartments.includes(dep.department)} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {dep.sub_departments.map((subDep) => (
                <ListItem key={subDep} button onClick={() => handleToggle(subDep)}>
                  <ListItemIcon>
                    <Checkbox
                      icon={<CheckBoxOutlineBlankIcon />}
                      checkedIcon={<CheckBoxIcon />}
                      edge="start"
                      checked={selectedDepartments.includes(subDep)}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={subDep}
                    onClick={() => handleSelectAllSubDepartments(dep.department, dep.sub_departments)}
                  />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </div>
      ))}
    </List>
  );
};

export default DepartmentList;