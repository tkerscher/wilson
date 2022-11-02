from setuptools import setup

def readme():
    with open('wilson/README.md') as f:
        return f.read()

setup(name='wilson',
    version='0.1.0',
    description='Tool to create animation files for Wilson',
    author='Tobias Kerscher',
    author_email='88444139+tkerscher@users.noreply.github.com',
    license='MIT',
    packages=['wilson'],
    install_requires=[
        'cmasher',
        'numpy>=1.20',
        'protobuf>=3.20.1'
    ],
    python_requires='>=3.8.*')
