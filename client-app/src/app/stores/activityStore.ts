import { observable, action } from "mobx";
import { createContext } from "react";
import agent from "../api/agent";
import { IActivity } from "../models/activity";
import {makeObservable} from 'mobx';

class ActivityStore {
    @observable activities: IActivity[] = [];
    @observable selectedActivity: IActivity | undefined;
    @observable loadingInitial = false;
    @observable editMode = false;
    @observable submitting = false;

    constructor() {
        makeObservable(this)
    }

    @action loadActivities = async () => {
        this.loadingInitial = true;
        try{
            const activities = await agent.Activities.list();
            activities.forEach(activity => {
            activity.date = activity.date.split('.')[0];
            this.activities.push(activity);
          });
          this.loadingInitial = false;
        } catch(error) {
            console.log(error);
            this.loadingInitial = false;
        }
    }

    @action createActivity = async (activity : IActivity) => {
        this.submitting = true;
        try {
            await agent.Activities.create(activity);
            this.activities.push(activity);
            this.editMode = false;
            this.submitting = false;
        } catch (error){
            console.log(error);
            this.submitting = false;
        }
    }

    @action openCreateForm = () => {
        this.editMode = true;
        this.selectedActivity = undefined;
    }

    @action selectActivity = (id:string) => {
        this.selectedActivity = this.activities.find(a => a.id === id);
        this.editMode = false;
    }
}

export default createContext(new ActivityStore());