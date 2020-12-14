import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";



import Form from "components/Appointment/Form";

afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];

  it("renders without student name if not provided", () => {
    const { getByPlaceholderText } = render(<Form interviewers={interviewers} />);
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  it("renders with initial student name", () => {
    const { getByTestId } = render(<Form interviewers={interviewers} student="Lydia Miller-Jones" />);
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });

  //========================================================================


  it("validates that the student name is not blank", () => {
    const mockOnSave = jest.fn()
    const { getByText } = render(<Form interviewers={interviewers}  onSave={mockOnSave}/>);
    const saveButton = getByText("Save")
    fireEvent.click(saveButton)

    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(mockOnSave).not.toHaveBeenCalled();
  });

  it("calls onSave function when the name is defined", () => {
    const mockOnSave = jest.fn()
    const { queryByText, getByText } = render(<Form interviewers={interviewers} student="Lydia Miller-Jones" onSave={mockOnSave}/>);
    const saveButton = getByText("Save")
    fireEvent.click(saveButton)

    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    expect(mockOnSave).toHaveBeenCalledTimes(1);
    expect(mockOnSave).toHaveBeenCalledWith("Lydia Miller-Jones", null);
  });



});