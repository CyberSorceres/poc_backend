interface ItemId {}

export interface Database {
  disconnect(): void;
    connect(): Promise<void>;

    createProject(projectData): Promise<any>;
    findProjectByID(projectId: ItemId): Promise<any>;
    deleteProject(projectId: ItemId): Promise<any>;
    setEndDate(projectId: ItemId): Promise<any>;
    setValidated(projectId: ItemId): Promise<any>;

    getEpicStory(epicStoryId: ItemId): Promise<any>;
    getUserStory(userStoryId: ItemId): Promise<any>;
    getUser(userId: ItemId): Promise<any>;
    getProject(projectId: ItemId): Promise<any>;
    getProjects(projectId: ItemId): Promise<any[]>;
    addUserToProject(projectId: ItemId, userId: ItemId): Promise<any>;
    deleteUserToProject(projectId: ItemId, userId: ItemId): Promise<void>;
    createUser(userData): Promise<any>;
    findUserByID(userId: ItemId): Promise<any>;
    deleteUser(userId: ItemId): Promise<any>;
    checkIfUserExists(userId: ItemId): Promise<boolean>;
	createEpicStory(epicStoryData): Promise<any>;
    deleteEpicStory(epicStoryId: ItemId): Promise<any>;
    createUserStory(userStoryData: any): Promise<any>;
    addFeedback(test: string, user: ItemId, userStoryId: ItemId): Promise<any>;
    setState(state: string, userStoryId: ItemId): Promise<any>;
    addDev(devId: ItemId, userStoryId: ItemId): Promise<any>;
	removeDev(devId: ItemId, userStoryId: ItemId): Promise<any>;
}
