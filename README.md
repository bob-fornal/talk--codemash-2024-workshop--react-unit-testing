# React Unit Testing Workshop

Welcome to the React Testing Workshop!

In this session, we will walk you through setting up a project and learning how to test in React using Jest and the React Testing Library.

Please follow the instructions below to set up your environment.

## Workshop Instructions

### Prerequisites

Installed:

* Node.js and npm (or yarn) installed on your computer. If you don't have them installed, please follow the instructions on the [official Node.js website](https://nodejs.org/en/download/).
* Git installed (or GUI tool).

### Setup

#### 1. Clone the repository

First, you need to clone the repository from GitHub. Make sure you clone the correct branch (main). You can do this by running the following command in your terminal or command prompt:

```bash
git clone -b walk-through https://github.com/bob-fornal/talk--codemash-2024-workshop--react-unit-testing.git
```

#### 2. Install dependencies

Navigate to the project directory and run the following command to install the required dependencies:

```bash
npm install
```

## Running the project

To run the project, execute the following command in the project directory:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Walk-Through

### Running tests

To run tests, open a different terminal in the project directory and run the following command:

```bash
npm run test
```

Press a to run all tests.

### Testing Links

In this part of the workshop, we will learn how to test links in a React application.

#### Testing Standard Link

Test Case: Redirect Home

```javascript
it('expects Link Home to redirect to /', async () => {
  await waitFor(() => {
    render(<NavMenu />);
  });

  const home = screen.getByTestId('nav-home');
  expect(home.textContent).toBe('Home');
  expect(home.closest('a')).toHaveAttribute('href', '/');
});
```

#### Testing Target Blank

```javascript
it('expects Link Some Page to redirect and open target', async () => {
  await waitFor(() => {
    render(<NavMenu />);
  });

  const somepage = screen.getByTestId('nav-some-page');
  expect(somepage.textContent).toBe('Some Page');
  expect(somepage.closest('a')).toHaveAttribute('href', '/some-page');
  expect(somepage.closest('a')).toHaveAttribute('target', '_blank');
});
```

In these test cases, we are using Jest and the React Testing library to test the behavior of links in our React application.

### Testing Modals

### Testing Forms

### Testing: Mocking a Hook

### Testing List Component

### Testing Search Functionality
