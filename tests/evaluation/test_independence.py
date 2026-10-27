"""Evaluation must run without the FREDIS application available."""
import os
from pathlib import Path
import subprocess
import sys


def test_cli_without_fredis():
    root = Path(__file__).parents[2]
    script = """
import importlib.abc
import sys
class BlockFredis(importlib.abc.MetaPathFinder):
    def find_spec(self, fullname, path=None, target=None):
        if fullname == 'fredis' or fullname.startswith('fredis.'):
            raise ImportError('FREDIS application is unavailable')
sys.meta_path.insert(0, BlockFredis())
from evaluation.core import inspect_dataset
result = inspect_dataset('tests/fixtures/sample.msds')
assert result['columns']
from evaluation.cli import main
main(['--help'])
"""
    result = subprocess.run([sys.executable, '-c', script], cwd=root,
                            env={**os.environ, 'PYTHONPATH': str(root)}, capture_output=True, text=True)
    assert result.returncode == 0, result.stderr
    assert not (root / 'fredis').exists()
