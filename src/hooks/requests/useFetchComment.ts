import { useReducer, useCallback, useEffect, useRef, useTransition } from 'react';
import { getComments } from '@/actions/comment';

type Action =
  | { type: 'FETCH_INIT' }
  | { type: 'FETCH_SUCCESS'; payload: Comment[]; }
  | {
    type: 'FETCH_FAILURE'; payload: {
      error: string;
      statusCode: number;
    }
  }
  | { type: 'RESET' };

function commentReducer(state: FetchCommentState, action: Action): FetchCommentState {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        status: 'loading'
      };
    case 'FETCH_SUCCESS':
      return {
        status: 'success',
        comments: [...state.comments, ...action.payload],
        hasMore: action.payload.length > 0,
        pageFloor: action.payload.at(-1)?.floor || state.pageFloor
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        status: 'error',
        error: action.payload.error,
        statusCode: action.payload.statusCode,
        hasMore: true
      };
    case 'RESET':
      return { status: 'loading', comments: [], hasMore: true, pageFloor: 0 };
    default:
      return state;
  }
}

export const useFetchComments = (postId: string, parentId: string | null, scrollAreaRef: React.RefObject<HTMLDivElement | null>) => {
  const [state, dispatch] = useReducer(commentReducer, { status: 'loading', comments: [], pageFloor: 0, hasMore: true });
  const lastRequestId = useRef(0);
  const [, startTransition] = useTransition();
  const loadPage = useCallback(async (pageFloor: number) => {
    const currentId = ++lastRequestId.current;
    dispatch({ type: 'FETCH_INIT' });

    startTransition(async () => {
      let error_code = 0;
      try {
        const response = await getComments(postId, pageFloor, parentId);
        if (currentId === lastRequestId.current) {
          if (response.status === 'success') {
            scrollAreaRef?.current?.scrollBy({
              top: -1,
              behavior: 'smooth'
            });
            dispatch({
              type: 'FETCH_SUCCESS',
              payload: response.data
            });
          } else {
            error_code = response.statusCode;
            throw new Error(response.message || "無法取得文章內容");
          }
        }
      } catch (err: unknown) {
        console.error(err);
        if (currentId === lastRequestId.current) {
          let message;
          if (err instanceof Error) {
            message = err.message
          } else {
            message = "An unexpected error occurred";
          }
          dispatch({
            type: 'FETCH_FAILURE', payload: {
              error: message,
              statusCode: error_code
            }
          });
        }
      } finally {
      }
    });
  }, [postId, parentId, scrollAreaRef]);

  useEffect(() => {
    dispatch({ type: 'RESET' });
    loadPage(0);
  }, [postId, loadPage]);

  return {
    state,
    loadMore: () => loadPage(state.pageFloor)
  };
};