/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

"use strict";

const hospitalContract = require("./lib/hospitalContract");

module.exports.HospitalContract = hospitalContract;
module.exports.contracts = [hospitalContract];
