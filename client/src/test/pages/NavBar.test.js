import React from "react";
import { render, screen } from "@testing-library/react";
// react-testing-library renders your components to document.body, this adds jest-dom's custom assertions:
import '@testing-library/jest-dom';
import NavBar from "../../components/NavBar";
//import ReactDOM from 'react-dom';
//import Profile from "../../pages/Profile";

// Test to check if NavBar renders correctly (before login):
test("Render Navbar", () => {
    render(<NavBar/>);
});

// Test to check if Home button is displayed on NavBar (before login):
test("Home button displayed on Navbar", () => {
    render(<NavBar/>);
    expect(screen.getByText("Home")).toBeInTheDocument();
});

// Test to check if Profile button is displayed on NavBar (after login):
test("Profile button displayed on NavBar", () => {
    const user = {fullName: "John"}
    render(<NavBar user = {user}/>);
    expect(screen.getByText("Profile")).toBeInTheDocument();
});

// Test to check if user's full name is displayed on NavBar (after login):
test("User's full name displayed on NavBar", () => {
    const user = {fullName: "John"}
    render(<NavBar user = {user}/>);
    expect(screen.getByText("Hello, John")).toBeInTheDocument();
});

// Test to check if My Exercises button is displayed on NavBar (after login):
test("My Exercises button displayed on NavBar", () => {
    const user = {fullName: "John"}
    render(<NavBar user = {user}/>);
    expect(screen.getByText("My Exercises")).toBeInTheDocument();
});

// Test to check if My Workouts button is displayed on NavBar (after login):
test("My Workouts button displayed on NavBar", () => {
    const user = {fullName: "John"}
    render(<NavBar user = {user}/>);
    expect(screen.getByText("My Workouts")).toBeInTheDocument();
});

// Test to check if My Splits button is displayed on NavBar (after login):
test("My Splits button displayed on NavBar", () => {
    const user = {fullName: "John"}
    render(<NavBar user = {user}/>);
    expect(screen.getByText("My Splits")).toBeInTheDocument();
});

// Test to check if My Weights button is displayed on NavBar (after login):
test("My Weights button displayed on NavBar", () => {
    const user = {fullName: "John"}
    render(<NavBar user = {user}/>);
    expect(screen.getByText("My Weights")).toBeInTheDocument();
});