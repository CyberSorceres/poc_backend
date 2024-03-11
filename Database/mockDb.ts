import { Database } from "./database";

const projects = [];
let id = 0;

export class MockDb implements Database {
  async connect() {}
  disconnect() {}
  async createProject(projectData): Promise<any> {
    const n = projects.push({ ...projectData, _id: id++ });
    return projects[n - 1];
  }
  async findProjectByID(projectId): Promise<any> {
    projects.find((p) => p._id === projectId);
  }
  async deleteProject(projectId): Promise<any> {}
  async setEndDate(projectId): Promise<any> {}
  async setValidated(projectId): Promise<any> {}

  async getEpicStory(epicStoryId): Promise<any> {}
  async getUserStory(userStoryId): Promise<any> {}
  async getUser(userId): Promise<any> {}
  async getProject(projectId): Promise<any> {
    return projects.filter((p) => p._id === projectId).at(0);
  }
  async getProjects(): Promise<any[]> {
    return projects;
  }
  async addUserToProject(projectId, userId): Promise<any> {}
  async deleteUserToProject(projectId, userId): Promise<void> {}
  async createUser(userData): Promise<any> {}
  async findUserByID(userId): Promise<any> {}
  async deleteUser(userId): Promise<any> {}
  async checkIfUserExists(userId): Promise<boolean> {
    return true;
  }
  async createEpicStory(epicStoryData): Promise<any> {}
  async deleteEpicStory(epicStoryId): Promise<any> {}
  async createUserStory(userStoryData: any): Promise<any> {}
  async addFeedback(test: string, user, userStoryId): Promise<any> {}
  async setState(state: string, userStoryId): Promise<any> {}
  async addDev(devId, userStoryId): Promise<any> {}
  async removeDev(devId, userStoryId): Promise<any> {}
}
