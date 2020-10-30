import { observable, action, computed, configure, runInAction } from "mobx";
import { createContext, SyntheticEvent } from "react";
import agent from "../api/agent";
import { IActivity } from "../models/activity";
import {makeObservable} from 'mobx';

configure({enforceActions: 'always'});

class ActivityStore {
    @observable activityRegistry = new Map();
    @observable activities: IActivity[] = [];
    @observable activity: IActivity | undefined;
    @observable loadingInitial = false;
    @observable editMode = false;
    @observable submitting = false;
    @observable target= '';

    @computed get activitiesByDate() {
        return Array.from( this.activityRegistry.values()).sort(
            (a,b) => Date.parse(a.date) - Date.parse( b.date));
    }

    constructor() {
        makeObservable(this)
    }

    @action loadActivities = async () => {
        this.loadingInitial = true;
        try{
            const activities = await agent.Activities.list();
            runInAction(() => {
                activities.forEach(activity => {
                activity.date = activity.date.split('.')[0];
                this.activityRegistry.set(activity.id,activity);
            });
          });
          this.loadingInitial = false;
        } catch(error) {
            console.log(error);
            runInAction(() => {
                this.loadingInitial = false;
            });
        }
    }

    @action loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if (activity) { 
            this.activity = activity;
        }
        else {
            this.loadingInitial = true;
            try {
                activity = await agent.Activities.details(id);
                runInAction(() => {
                    this.activity = activity;
                    this.loadingInitial = false;
                })
            }
            catch (error) {
                console.log(error);
                runInAction(() => {
                    this.loadingInitial = false;
                })
            }
        }
    }

    getActivity = (id:string) => {
        return this.activityRegistry.get(id);
    }

    @action createActivity = async (activity : IActivity) => {
        this.submitting = true;
        try {
            await agent.Activities.create(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id,activity);
                this.editMode = false;
                this.submitting = false;
            });
        } catch (error){
            console.log(error);
            runInAction(() => {
                this.submitting = false;
            });
        }
    }

    @action editActivity = async (activity: IActivity) => {
        this.submitting = true;
        try{
           await agent.Activities.update(activity);
           runInAction(() => {
                this.activityRegistry.set(activity.id,activity);
                this.activity = activity;
                this.editMode = false;
                this.submitting = false;
           });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.submitting = false;
            });
        }
    }

    @action openCreateForm = () => {
        this.editMode = true;
        this.activity = undefined;
    }

    @action openEditForm = (id: string) => {
        this.selectActivity = this.activityRegistry.get(id);
        this.editMode = true;
    }

    @action deleteActivity = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
        this.submitting = true;
        this.target = event.currentTarget.name;
        try
        {
            await agent.Activities.delete(id);
            runInAction(() => {
                this.activityRegistry.delete(id);
                this.submitting = false;
                this.target = '';
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.submitting = false;
                this.target = '';
            });
        }
    }

    @action cancelSelectedActivity = () => {
        this.activity = undefined;
    }

    @action cancelFormOpen = () => {
        this.editMode = false;
    }

    @action selectActivity = (id:string) => {
        this.activity = this.activityRegistry.get(id);
        this.editMode = false;
    }
}

export default createContext(new ActivityStore());