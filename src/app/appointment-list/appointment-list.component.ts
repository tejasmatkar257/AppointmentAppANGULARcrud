import { Component, OnInit } from '@angular/core';
import { Appointment } from '../models/appointment';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {

  ngOnInit(): void {
    let savedAppointments = localStorage.getItem("appointments");
    if (savedAppointments) {
      this.appointments = JSON.parse(savedAppointments);
    }
  }

  newAppointmentTitle: string = "";
  newAppointmentDate: Date = new Date();
  editingIndex: number | null = null;

  appointments: Appointment[] = []

  addAppointment() {
    if (this.newAppointmentTitle.trim().length && this.newAppointmentDate) {
      if (this.editingIndex !== null) {
        // Editing existing appointment
        this.appointments[this.editingIndex].title = this.newAppointmentTitle;
        this.appointments[this.editingIndex].date = this.newAppointmentDate;
        this.editingIndex = null;
      } else {
        // Adding new appointment
        let newAppointment: Appointment = {
          id: Date.now(),
          title: this.newAppointmentTitle,
          date: this.newAppointmentDate
        }
        this.appointments.push(newAppointment);
      }

      this.newAppointmentTitle = "";
      this.newAppointmentDate = new Date();

      localStorage.setItem("appointments", JSON.stringify(this.appointments));
    }
  }

  editAppointment(index: number) {
    this.newAppointmentTitle = this.appointments[index].title;
    this.newAppointmentDate = this.appointments[index].date;
    this.editingIndex = index;
  }

  deleteAppointment(index: number) {
    this.appointments.splice(index, 1);
    localStorage.setItem("appointments", JSON.stringify(this.appointments));
  }
}
