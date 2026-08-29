/**
 * Note: When using the Node.JS APIs, the config file
 * doesn't apply. Instead, pass options directly to the APIs.
 *
 * All configuration options: https://remotion.dev/docs/config
 */

import { Config } from "@remotion/cli/config";

Config.setRspack(true);

// Tre fotogrammi alla volta invece di dieci: il render dura di più ma il Mac
// resta usabile e le ventole stanno zitte. Per andare veloce: --concurrency=8.
Config.setConcurrency(3);
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
