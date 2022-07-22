import { FirestoreErrorCode } from 'firebase/firestore'

const enum MESSAGES {
  WRONG_PASSWORD = 'Uh-oh! You have selected the wrong characters!',
  PASSWORDS_NOT_MATCHED = 'Uh-oh! You have selected the wrong characters!',
  TOO_MANY_ATTEMPTS = 'Failed too many login attempts. Try again later.',
  QUOTA_EXCEEDED = 'Checked too many usernames. Try again later.',
  NO_USER_DOCUMENT = 'User docoment not found.'
}

const FirestoreErrorCodes = {
  // Causes are copied from:
  // https://github.com/grpc/grpc/blob/bceec94ea4fc5f0085d81235d8e1c06798dc341a/include/grpc%2B%2B/impl/codegen/status_code_enum.h
  /** Not an error; returned on success. */
  OK: 'ok' as FirestoreErrorCode,

  /** The operation was cancelled (typically by the caller). */
  CANCELLED: 'cancelled' as FirestoreErrorCode,

  /** Unknown error or an error from a different error domain. */
  UNKNOWN: 'unknown' as FirestoreErrorCode,

  /**
   * Client specified an invalid argument. Note that this differs from
   * FAILED_PRECONDITION. INVALID_ARGUMENT indicates arguments that are
   * problematic regardless of the state of the system (e.g., a malformed file
   * name).
   */
  INVALID_ARGUMENT: 'invalid-argument' as FirestoreErrorCode,

  /**
   * Deadline expired before operation could complete. For operations that
   * change the state of the system, this error may be returned even if the
   * operation has completed successfully. For example, a successful response
   * from a server could have been delayed long enough for the deadline to
   * expire.
   */
  DEADLINE_EXCEEDED: 'deadline-exceeded' as FirestoreErrorCode,

  /** Some requested entity (e.g., file or directory) was not found. */
  NOT_FOUND: 'not-found' as FirestoreErrorCode,

  /**
   * Some entity that we attempted to create (e.g., file or directory) already
   * exists.
   */
  ALREADY_EXISTS: 'already-exists' as FirestoreErrorCode,

  /**
   * The caller does not have permission to execute the specified operation.
   * PERMISSION_DENIED must not be used for rejections caused by exhausting
   * some resource (use RESOURCE_EXHAUSTED instead for those errors).
   * PERMISSION_DENIED must not be used if the caller can not be identified
   * (use UNAUTHENTICATED instead for those errors).
   */
  PERMISSION_DENIED: 'permission-denied' as FirestoreErrorCode,

  /**
   * The request does not have valid authentication credentials for the
   * operation.
   */
  UNAUTHENTICATED: 'unauthenticated' as FirestoreErrorCode,

  /**
   * Some resource has been exhausted, perhaps a per-user quota, or perhaps the
   * entire file system is out of space.
   */
  RESOURCE_EXHAUSTED: 'resource-exhausted' as FirestoreErrorCode,

  /**
   * Operation was rejected because the system is not in a state required for
   * the operation's execution. For example, directory to be deleted may be
   * non-empty, an rmdir operation is applied to a non-directory, etc.
   *
   * A litmus test that may help a service implementor in deciding
   * between FAILED_PRECONDITION, ABORTED, and UNAVAILABLE:
   *  (a) Use UNAVAILABLE if the client can retry just the failing call.
   *  (b) Use ABORTED if the client should retry at a higher-level
   *      (e.g., restarting a read-modify-write sequence).
   *  (c) Use FAILED_PRECONDITION if the client should not retry until
   *      the system state has been explicitly fixed. E.g., if an "rmdir"
   *      fails because the directory is non-empty, FAILED_PRECONDITION
   *      should be returned since the client should not retry unless
   *      they have first fixed up the directory by deleting files from it.
   *  (d) Use FAILED_PRECONDITION if the client performs conditional
   *      REST Get/Update/Delete on a resource and the resource on the
   *      server does not match the condition. E.g., conflicting
   *      read-modify-write on the same resource.
   */
  FAILED_PRECONDITION: 'failed-precondition' as FirestoreErrorCode,

  /**
   * The operation was aborted, typically due to a concurrency issue like
   * sequencer check failures, transaction aborts, etc.
   *
   * See litmus test above for deciding between FAILED_PRECONDITION, ABORTED,
   * and UNAVAILABLE.
   */
  ABORTED: 'aborted' as FirestoreErrorCode,

  /**
   * Operation was attempted past the valid range. E.g., seeking or reading
   * past end of file.
   *
   * Unlike INVALID_ARGUMENT, this error indicates a problem that may be fixed
   * if the system state changes. For example, a 32-bit file system will
   * generate INVALID_ARGUMENT if asked to read at an offset that is not in the
   * range [0,2^32-1], but it will generate OUT_OF_RANGE if asked to read from
   * an offset past the current file size.
   *
   * There is a fair bit of overlap between FAILED_PRECONDITION and
   * OUT_OF_RANGE. We recommend using OUT_OF_RANGE (the more specific error)
   * when it applies so that callers who are iterating through a space can
   * easily look for an OUT_OF_RANGE error to detect when they are done.
   */
  OUT_OF_RANGE: 'out-of-range' as FirestoreErrorCode,

  /** Operation is not implemented or not supported/enabled in this service. */
  UNIMPLEMENTED: 'unimplemented' as FirestoreErrorCode,

  /**
   * Internal errors. Means some invariants expected by underlying System has
   * been broken. If you see one of these errors, Something is very broken.
   */
  INTERNAL: 'internal' as FirestoreErrorCode,

  /**
   * The service is currently unavailable. This is a most likely a transient
   * condition and may be corrected by retrying with a backoff.
   *
   * See litmus test above for deciding between FAILED_PRECONDITION, ABORTED,
   * and UNAVAILABLE.
   */
  UNAVAILABLE: 'unavailable' as FirestoreErrorCode,

  /** Unrecoverable data loss or corruption. */
  DATA_LOSS: 'data-loss' as FirestoreErrorCode
}

export { FirestoreErrorCodes, MESSAGES }
