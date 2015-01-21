'use strict';

angular.module('strengthTracker.version', [
  'strengthTracker.version.interpolate-filter',
  'strengthTracker.version.version-directive'
])

.value('version', '0.1');
