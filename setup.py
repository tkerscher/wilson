from setuptools import setup

def readme():
    with open('p1on/README.md') as f:
        return f.read()

setup(name='p1on',
    version='0.0.1',
    description='Tool to create animation files for P1ON',
    author='Tobias Kerscher',
    author_email='88444139+tkerscher@users.noreply.github.com',
    license='MIT',
    packages=['p1on'],
    install_requires=[
        'numpy',
        'protobuf>=3.20.1'
    ],
    python_requires='>=3.8.*')
