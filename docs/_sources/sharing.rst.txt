Sharing Animations
==================

You can use url parameters to tell Wilson to open a catalogue or specific
project right away. This allows to share data by simply providing a link.
For this you have the following parameters:

+--------+-----------------------------------------------------------------+
| Param  | Description                                                     |
+========+=================================================================+
| cat    | Link to catalogue file                                          |
+--------+-----------------------------------------------------------------+
| event  | Filename of project to open as stored in catalogue zip archive  |
+--------+-----------------------------------------------------------------+
| stage  | Link to stage file                                              |
+--------+-----------------------------------------------------------------+

| Such a link can for example look like the following:
| *mysite.com/viewer?cat=mycatalogue&event=awesomeevent&stage=stage.glb*

.. warning::
    The parameters must be encoded for save use inside the url!
    JavaScript (and thus your Browser) provide the **encodeURLComponent()**
    function.

.. note::
    Stage files can be quite large. Wilson will first load the catalogue and
    only after it's finished start to load the stage. The catalogue's projects
    can be viewed while the stage is still loading. Check the settings tab to
    see the current progress.
