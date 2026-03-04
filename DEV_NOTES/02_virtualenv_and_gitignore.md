# Virtual Environment + Git Ignore Notes

## Why we use a virtual environment

A virtual environment keeps this project’s Python packages isolated.
That means:

- installs for this project won’t mess up other projects
- two projects can use different versions safely
- deploying becomes cleaner because we know exactly what we installed

## Where we put it

We create the virtual env inside `backend/`:
`backend/.venv/`

This keeps Python dependencies separate from the frontend.

## Why `.venv/` is ignored

A virtual environment contains thousands of generated files and machine-specific paths.
It should never be committed to GitHub.

## Why we ignore datasets and model binaries

- datasets can be huge (GitHub will reject or slow the repo)
- model files change often and can be large
  We will keep them local and only commit code and small samples if needed.
