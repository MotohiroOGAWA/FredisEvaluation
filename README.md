# FREDIS Evaluation

Independent evaluation UI and Python CLI for existing spectrum results.

- Compare trainable spectrum coverage across tools and categories.
- Summarize similarity scores by metadata, collision energy, molecular descriptors, or SMARTS.
- Compare tools and datasets using grouped box/violin plots.
- Save/reopen `.evaltrainable.pft`, `.evalcol.pft`, and `.evalgroup.pft` configurations and export charts.

## Open the UI

Open `fredis-evaluation.code-workspace`, select **FREDIS Evaluation Workbench** in Run and Debug, and press F5. In the development window, run **FREDIS: Open Evaluation** from the command palette. The parent CLEFTS workspace also provides **Debug FREDIS Evaluation Workbench Extension**.

Alternatively run `./scripts/open-workbench.sh`. The launch reuses the current VS Code environment and its installed remote extensions.

## Python environment

From this directory:

```bash
python -m pip install -e .
python -m evaluation --help
```

The UI runs this project's Evaluation CLI. It does not invoke FREDIS training, prediction, or reaction editing. Select existing datasets and similarity results through the UI. The separate native `msentity` package reads spectrum containers. Its source snapshot and license are in `upstream/msentity`; versions are recorded in `upstream/versions.json`.

The extension settings are `fredisEvaluation.pythonPath` and `fredisEvaluation.applicationRoot`. Development launches discover the Python project in the extension directory. When installing the VSIX elsewhere, set Application Root to this Evaluation project directory and select a Python environment with its dependencies installed.

## Build and verify

```bash
python -m pytest tests/evaluation -q
npm ci
npm run check
npm run package
```

The package is `artifacts/fredis_evaluation_workbench.vsix`. Its extension identity is `fredis.fredis-evaluation`. The extension and Python project share this root directory.

See `evaluation/README.md` and `SOURCE_SNAPSHOT.json`.


Native dataset setup (CMake, C++20, HDF5 development files,
`nlohmann-json3-dev`, `pyarrow>=20`):

```bash
python scripts/build-native.py
python -m pip install -e .
```

Evaluation reads similarity tables directly from the public `.mssim` schema;
it does not need the similarity calculation library or the viewer.
