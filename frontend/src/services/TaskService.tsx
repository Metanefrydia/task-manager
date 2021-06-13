import axios from "axios";
import AuthenticationService from "./AuthenticationService";

class TaskService {
  public async getTasks(tasksDate: string) {
    return axios.get(`/tasks/${tasksDate}`, {
      headers: { Authorization: AuthenticationService.getToken() },
    });
  }

  public async addTask(taskData: any) {
    await axios.post(`/add-task`, taskData, {
      headers: { Authorization: AuthenticationService.getToken() },
    });
  }

  public async editTask(taskData: any) {
    const editedTaskData = {
      _id: taskData._id,
      title: taskData.title,
      description: taskData.description,
      status: taskData.status,
      assignee: taskData.assignee,
    };


    await axios.put(`/task/${taskData._id}`, editedTaskData, {
      headers: { Authorization: AuthenticationService.getToken() },
    });
  }

  public async deleteTask(taskId: any) {
    await axios.delete(`/delete-task/${taskId}`, {
      headers: { Authorization: AuthenticationService.getToken() },
    });
  }
}

export default new TaskService();
