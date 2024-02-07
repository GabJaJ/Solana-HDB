// eslint-disable @tipescript-eslint/no-explicit-any
import { Buffer } from "buffer";

(window as any).global = window;
(window as any).global.buffer = Buffer;
(window as any).process = {env: { }};


