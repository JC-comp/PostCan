type ServerResponse<T> =
    | { status: 'success'; data: T; }
    | { status: 'error'; statusCode: number; message: string; };