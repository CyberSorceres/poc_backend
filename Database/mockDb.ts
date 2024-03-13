import { Database } from "./database";

export class MockDb implements Database {
  async connect() {}
  disconnect() {}
  static projects = [];
  static id = 0;
  static epicStories = [];
  static userStories = [];
  static reset() {
    MockDb.projects = [];
    MockDb.id = 0;
    MockDb.epicStories = [];
    MockDb.userStories = [];
  }
  async createProject(projectData): Promise<any> {
    const n = MockDb.projects.push({ ...projectData, _id: MockDb.id++ });
    return MockDb.projects[n - 1];
  }
  async findProjectByID(projectId): Promise<any> {
    MockDb.projects.find((p) => p._id === projectId);
  }
  async deleteProject(projectId): Promise<any> {}
  async setEndDate(projectId): Promise<any> {}
  async setValidated(projectId): Promise<any> {}

  async getEpicStory(epicStoryId): Promise<any> {}
  async getUserStory(userStoryId): Promise<any> {
    return MockDb.userStories.find((u) => u._id === userStoryId);
  }
  async getUser(userId): Promise<any> {}
  async getProject(projectId): Promise<any> {
    return MockDb.projects.filter((p) => p._id === projectId).at(0);
  }
  async getProjects(): Promise<any[]> {
    return MockDb.projects;
  }
  async addUserToProject(projectId, userId): Promise<any> {}
  async deleteUserToProject(projectId, userId): Promise<void> {}
  async createUser(userData): Promise<any> {}
  async findUserByID(userId): Promise<any> {}
  async deleteUser(userId): Promise<any> {}
  async checkIfUserExists(userId): Promise<boolean> {
    return true;
  }
  async createEpicStory(epicStoryData): Promise<any> {
    const project = MockDb.projects.find(
      (p) => p._id === epicStoryData.project,
    );
    epicStoryData._id = MockDb.id++;
    MockDb.epicStories.push(epicStoryData);
    if (project) {
      project.epicStories.push(epicStoryData);
    }
    return epicStoryData;
  }
  async deleteEpicStory(epicStoryId): Promise<any> {}
  async createUserStory(userStoryData: any): Promise<any> {
    const epicStory = MockDb.epicStories.find(
      (e) => e._id === userStoryData.epicStory,
    );
    userStoryData._id = MockDb.id++;
    MockDb.userStories.push(userStoryData);
    if (epicStory) {
      epicStory.userStories.push(userStoryData);
    }
    return userStoryData;
  }
  async addFeedback(test: string, user, userStoryId): Promise<any> {}
  async setState(state: string, userStoryId): Promise<any> {}
  async addDev(devId, userStoryId): Promise<any> {
    const userStory = MockDb.userStories.find(
      (userStory) => userStoryId === userStory._id,
    );
    userStory.dev = devId;
  }
  async removeDev(devId, userStoryId): Promise<any> {}
}
