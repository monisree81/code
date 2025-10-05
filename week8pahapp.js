import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      tasks: [
        { id: 1, title: 'Complete React Assignment', priority: 'High', completed: false, createdAt: Date.now() },
        { id: 2, title: 'Review Bootstrap Documentation', priority: 'Medium', completed: true, createdAt: Date.now() },
        { id: 3, title: 'Debug Lifecycle Methods', priority: 'High', completed: false, createdAt: Date.now() },
        { id: 4, title: 'Setup React Dev Tools', priority: 'Low', completed: false, createdAt: Date.now() }
      ],
      filter: 'All',
      isLoading: true,
      mountTime: null,
      showModal: false,
      newTaskTitle: '',
      newTaskPriority: 'Medium'
    };

    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleTaskToggle = this.handleTaskToggle.bind(this);
    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
    this.handleShowModal = this.handleShowModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    console.log('Component mounted');
    
    this.setState({ 
      mountTime: Date.now()
    });

    this.loadingTimer = setTimeout(() => {
      this.setState({ isLoading: false });
    }, 2000);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.filter !== this.state.filter) {
      console.log(`Filter changed from ${prevState.filter} to ${this.state.filter}`);
    }

    if (prevState.tasks.length !== this.state.tasks.length) {
      console.log(`Tasks count changed from ${prevState.tasks.length} to ${this.state.tasks.length}`);
    }
  }

  componentWillUnmount() {
    console.log('Component will unmount');
    if (this.loadingTimer) {
      clearTimeout(this.loadingTimer);
    }
  }

  handleFilterChange(filterType) {
    this.setState({ filter: filterType });
  }

  handleTaskToggle(taskId) {
    this.setState(prevState => ({
      tasks: prevState.tasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    }));
  }

  handleDeleteTask(taskId) {
    this.setState(prevState => ({
      tasks: prevState.tasks.filter(task => task.id !== taskId)
    }));
  }

  handleShowModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ 
      showModal: false,
      newTaskTitle: '',
      newTaskPriority: 'Medium'
    });
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleAddTask() {
    const { newTaskTitle, newTaskPriority, tasks } = this.state;
    
    if (newTaskTitle.trim() === '') return;

    const newTask = {
      id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
      title: newTaskTitle,
      priority: newTaskPriority,
      completed: false,
      createdAt: Date.now()
    };

    this.setState(prevState => ({
      tasks: [...prevState.tasks, newTask],
      showModal: false,
      newTaskTitle: '',
      newTaskPriority: 'Medium'
    }));
  }

  getFilteredTasks() {
    const { tasks, filter } = this.state;
    
    switch (filter) {
      case 'High':
        return tasks.filter(task => task.priority === 'High');
      case 'Medium':
        return tasks.filter(task => task.priority === 'Medium');
      case 'Low':
        return tasks.filter(task => task.priority === 'Low');
      case 'Completed':
        return tasks.filter(task => task.completed);
      default:
        return tasks;
    }
  }

  getPriorityBadgeClass(priority) {
    switch (priority) {
      case 'High':
        return 'bg-primary';
      case 'Medium':
        return 'bg-warning';
      case 'Low':
        return 'bg-secondary';
      default:
        return 'bg-secondary';
    }
  }

  render() {
    const { isLoading, filter, showModal, newTaskTitle, newTaskPriority } = this.state;
    const filteredTasks = this.getFilteredTasks();

    if (isLoading) {
      return (
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
              <span className="navbar-brand">Task Manager</span>
            </div>
          </nav>
          
          <div className="container mt-5 d-flex justify-content-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <span className="navbar-brand">Task Manager</span>
            <div className="navbar-nav ms-auto">
              <span className="nav-link">Help</span>
            </div>
          </div>
        </nav>

        <div className="container mt-4">
          <div className="row">
            <div className="col-12">
              <div className="btn-group" role="group">
                {['All', 'High', 'Medium', 'Low', 'Completed'].map(filterType => (
                  <button
                    key={filterType}
                    type="button"
                    className={`btn ${filter === filterType ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => this.handleFilterChange(filterType)}
                  >
                    {filterType}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-12">
              {filteredTasks.length === 0 ? (
                <div className="alert alert-info" role="alert">
                  No tasks found for the selected filter.
                </div>
              ) : (
                filteredTasks.map(task => (
                  <div key={task.id} className="card mb-3">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h5 className="card-title">
                            {task.title}
                            {task.completed && (
                              <span className="badge bg-success ms-2">Completed</span>
                            )}
                          </h5>
                          <span className={`badge ${this.getPriorityBadgeClass(task.priority)}`}>
                            {task.priority} Priority
                          </span>
                        </div>
                        <div>
                          {/* CHANGED: Added checkbox for task completion to match test expectations */}
                          <input
                            type="checkbox"
                            className="form-check-input me-2"
                            checked={task.completed}
                            onChange={() => this.handleTaskToggle(task.id)}
                            aria-label={task.title}
                          />
                          <button
                            className={`btn btn-sm ${task.completed ? 'btn-warning' : 'btn-success'} me-2`}
                            onClick={() => this.handleTaskToggle(task.id)}
                          >
                            {task.completed ? 'Undo' : 'Complete'}
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => this.handleDeleteTask(task.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-12">
              <button
                className="btn btn-primary"
                onClick={this.handleShowModal}
              >
                Add New Task
              </button>
            </div>
          </div>
        </div>

        {showModal && (
          <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add New Task</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={this.handleCloseModal}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="taskTitle" className="form-label">Task Title</label>
                    {/* CHANGED: Updated placeholder to match test expectation */}
                    <input
                      type="text"
                      className="form-control"
                      id="taskTitle"
                      name="newTaskTitle"
                      value={newTaskTitle}
                      onChange={this.handleInputChange}
                      placeholder="Enter task title..."
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Priority</label>
                    {/* CHANGED: Replaced radio buttons with select to match test expectation */}
                    <select 
                      className="form-select"
                      name="newTaskPriority"
                      value={newTaskPriority}
                      onChange={this.handleInputChange}
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={this.handleCloseModal}
                  >
                    Cancel
                  </button>
                  {/* CHANGED: Updated button text to match test expectation */}
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={this.handleAddTask}
                  >
                    Add Task
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
