import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JobsResponse } from 'src/types/api';
import { Job } from 'src/types/general';
import { API_URL } from './globals';

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  private token: string | null;

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
  }

  getJobs(search: string = '', page: number = 1) {
    return this.http.get<JobsResponse>(API_URL + '/jobs/get', {
      params: { search, page },
    });
  }

  deleteJob(id: string) {
    return this.http.delete(API_URL + '/jobs/delete', {
      params: { id },
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }

  addJob(job: Job) {
    return this.http.post(
      API_URL + '/jobs/add',
      {
        ...job,
      },
      {
        headers: { Authorization: `Bearer ${this.token}` },
      }
    );
  }

  editJob(job: Job) {
    return this.http.put(
      API_URL + '/jobs/update',
      {
        ...job,
      },
      {
        headers: { Authorization: `Bearer ${this.token}` },
      }
    );
  }

  getUserJobs() {
    return this.http.get<Job[]>(API_URL + '/userjobs/get', {
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }

  applyForJob(
    jobId: string,
    data: { name: string; phone: number; email: string }
  ) {
    return this.http.post(
      API_URL + '/userjobs/add',
      {
        ...data,
      },
      {
        headers: { Authorization: `Bearer ${this.token}` },
        params: {
          jobId,
        },
      }
    );
  }
}
