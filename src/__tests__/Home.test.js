/**
 * @jest-environment jsdom
 */
import { render, screen, toHaveTextContent } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomePage from "../components/home/Home";
 

// const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();


// h1 is rendered
describe("If h1 is rendered", () => {
    render(<HomePage />);
    const p = screen.getByTestId("test");
    const pText = screen.getByText("Welcome to Meal Plan Assistant. To start add your recipes into the recipes list, there is a lot of detail that can be included into it. After that you can review your meal plan and decide which recipes you want to include on each month. Click on the month to view your current plan for that month and customize it. After you finish adding recipes, export the grocery list from that month and get ready for cooking.");

    test("h1 text", ()=>{
        expect(p).toBeInTheDocument();
        
    })

    test("p with text inside", ()=>{
        expect(p).toBe(pText);
    })
    
  });

  