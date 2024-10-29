import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, getDocs, Timestamp, query, where } from "firebase/firestore";

const firebaseConfig = {
 //your API
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const colRef = collection(db, 'list');

const displayTasks = (tasks) => {
  const taskList = document.querySelector('.task-list');
  taskList.innerHTML = '';

  tasks.forEach((task) => {
    const data = task.data();
    
    const row = document.createElement('tr');
    
    const taskCell = document.createElement('td');
    taskCell.textContent = data.task;

    const taskIdCell = document.createElement('td');
    taskIdCell.textContent = data.taskId;

    row.appendChild(taskCell);
    row.appendChild(taskIdCell);

    taskList.appendChild(row);
  });
};

const fetchTasks = async () => {
  const snapshot = await getDocs(colRef);
  displayTasks(snapshot.docs); 
};

window.onload = fetchTasks;

const addForm = document.querySelector('.add-task-form');
addForm.addEventListener('submit', (e) => {
  e.preventDefault();

  addDoc(colRef, {
    task: addForm.task.value,
    taskId: addForm['taskId'].value, 
    createdAt: Timestamp.now()
  })
  .then(() => {
    console.log("Task added successfully!");
    addForm.reset(); 
    fetchTasks(); 
  })
  .catch(err => {
    console.error("Error adding task: ", err.message);
  });
});

const modifyForm = document.querySelector('.modify-task-form');
modifyForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const taskId = modifyForm['taskId'].value;
  const newTask = modifyForm.modifiedTask.value;

  if (taskId && newTask) {
    const q = query(colRef, where("taskId", "==", taskId));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const docRef = snapshot.docs[0].ref;

      updateDoc(docRef, {
        task: newTask
      })
      .then(() => {
        console.log("Task updated successfully!");
        modifyForm.reset(); 
        fetchTasks(); 
      })
      .catch(err => {
        console.error("Error updating task: ", err.message);
      });
    } else {
      alert("No task found with the specified ID.");
    }
  } else {
    alert("Please enter both task ID and modified task.");
  }
});

const deleteForm = document.querySelector('.delete-task-form');
deleteForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const taskId = deleteForm['taskId'].value;

  if (taskId) {
    const q = query(colRef, where("taskId", "==", taskId));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const docRef = snapshot.docs[0].ref;

      deleteDoc(docRef)
      .then(() => {
        console.log("Task deleted successfully!");
        deleteForm.reset(); 
        fetchTasks(); 
      })
      .catch(err => {
        console.error("Error deleting task: ", err.message);
      });
    } else {
      alert("No task found with the specified ID.");
    }
  } else {
    alert("Please enter a task ID to delete.");
  }
});

const fetchTasksByDate = async (startDate, endDate) => {
  const q = query(
    colRef, 
    where("createdAt", ">=", startDate),
    where("createdAt", "<=", endDate)
  );
  const snapshot = await getDocs(q);
  displayTasks(snapshot.docs); 
};

const filterForm = document.querySelector('.filter-task-form');
filterForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const startDate = new Date(filterForm.startDate.value);
  const endDate = new Date(filterForm.endDate.value);

  if (startDate && endDate) {
    fetchTasksByDate(Timestamp.fromDate(startDate), Timestamp.fromDate(endDate));
  } else {
    alert("Please select both start and end dates.");
  }
});
