import React from "react";
import axios from "axios";
import { render, cleanup, waitForElement, prettyDOM, getByText, getAllByTestId, getByAltText, getByPlaceholderText, queryByText } from "@testing-library/react";

import Application from "components/Application";
import { fireEvent } from "@testing-library/react/dist";

afterEach(cleanup);

describe("Application", () => {


  it.only("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });


  it("loads data books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];  //12pm Appointment

    //Click Add Appt 12pm
    fireEvent.click(getByAltText(appointment, "Add"));

    //Type Student Name
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    //Click Interviewer
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    //Click Save, cfm Saving, the wait until loading complete
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, /saving/i)).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    //Find Day Tag and cfm spots updated
    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));
    expect(getByText(day, /no spots remaining/i)).toBeInTheDocument();
  });


  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[1];  //1pm Appointment

    //Click the delete btn of an Appt
    fireEvent.click(getByAltText(appointment, "Delete"));
    //Confirm msg
    expect(getByText(appointment, /are you sure you want to delete?/i)).toBeInTheDocument();
    //Confrim to delete click
    fireEvent.click(getByText(appointment, "Confirm"));
    //check deleting msg
    expect(getByText(appointment, /deleting/i)).toBeInTheDocument();
    // console.log(prettyDOM(appointment))
    //Wait for delete
    await waitForElement(() => getByAltText(appointment, "Add"));
    // Cfm Spots is adjusted
    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));
    expect(getByText(day, /1 spot remaining/i)).toBeInTheDocument();
  });


  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[1];  //1pm Appointment
    //Click the Edit btn of an Appt
    fireEvent.click(getByAltText(appointment, "Edit"));
    //Confirm loaded info

    //Edit Name  
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    //click Save
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, /saving/i)).toBeInTheDocument();
    //Wait for save
    await waitForElement(() => getByText(appointment, "Lydia Jones"));

    // Cfm Spots is unchanged
    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));
    expect(getByText(day, /1 spot remaining/i)).toBeInTheDocument();
  });




  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce(() => Promise.reject("ERROR"));

    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];  //12pm Appointment

    //Click Add Appt 12pm
    fireEvent.click(getByAltText(appointment, "Add"));

    //Enter info
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    //Click Save,
    fireEvent.click(getByText(appointment, "Save"));
    //DELETE ERROR...
    await waitForElement(() => getByText(appointment, "Error"));
    expect(getByText(appointment, /could not save/i)).toBeInTheDocument();

    //Click Close
    fireEvent.click(getByAltText(appointment, "Close"));
    // Confirm back to form
    expect(getByPlaceholderText(appointment, /enter student name/i)).toBeInTheDocument();
  });




  it("shows the delete error when failing to delete an appointment", async () => {
    axios.delete.mockRejectedValueOnce(() => Promise.reject("ERROR"));

    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[1];  //12pm Appointment

    //Click the delete btn of an Appt
    fireEvent.click(getByAltText(appointment, "Delete"));
    //Confirm msg
    expect(getByText(appointment, /are you sure you want to delete?/i)).toBeInTheDocument();
    //Confrim to delete click
    fireEvent.click(getByText(appointment, "Confirm"));
    
    //DELETE ERROR...
    await waitForElement(() => getByText(appointment, "Error"));
    expect(getByText(appointment, /could not delete/i)).toBeInTheDocument();

    //Click Close
    fireEvent.click(getByAltText(appointment, "Close"));
    // Confirm back to form
    expect(getByText(appointment, /Archie Cohen/i)).toBeInTheDocument()
  });


});