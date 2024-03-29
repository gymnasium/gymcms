# This file hopes to be an exhaustive list of the JS compiled by open edx


# TODO: Do we even use proctoring? I think not.
proctoring_js = (
    [
        'proctoring/js/models/proctored_exam_allowance_model.js',
        'proctoring/js/models/proctored_exam_attempt_model.js',
        'proctoring/js/models/proctored_exam_model.js'
    ] +
    [
        'proctoring/js/collections/proctored_exam_allowance_collection.js',
        'proctoring/js/collections/proctored_exam_attempt_collection.js',
        'proctoring/js/collections/proctored_exam_collection.js'
    ] +
    [
        'proctoring/js/views/Backbone.ModalDialog.js',
        'proctoring/js/views/proctored_exam_add_allowance_view.js',
        'proctoring/js/views/proctored_exam_allowance_view.js',
        'proctoring/js/views/proctored_exam_attempt_view.js',
        'proctoring/js/views/proctored_exam_view.js'
    ] +
    [
        'proctoring/js/proctored_app.js'
    ]
)

# courseware JS
courseware_js = [
  'js/vendor/openedx/ajax-error.js',
  'js/vendor/openedx/courseware.js',
  'js/vendor/openedx/histogram.js',
  'js/vendor/openedx/navigation.js', # file no longer required (see @https://raw.githubusercontent.com/appsembler/edx-platform/appsembler/hawthorn/master/lms/static/js/navigation.js)
  'js/vendor/openedx/modules/tab.js',
]

# base_vendor_js remapping to _includes folder
base_vendor_js = [
  'js/vendor/jquery.js',
  'js/vendor/jquery-migrate.js',
  'js/vendor/jquery.cookie.js',
  'js/vendor/url.min.js',
  'js/vendor/underscore.js',
  'js/vendor/underscore.string.js',
  'js/vendor/picturefill.js',

  # Make some edX UI Toolkit utilities available in the global "edx" namespace
  'js/vendor/edx-ui-toolkit/global-loader.js',
  'js/vendor/edx-ui-toolkit/string-utils.js',
  'js/vendor/edx-ui-toolkit/html-utils.js',

  # Finally load RequireJS and dependent vendor libraries
  'js/vendor/require.js',
  'js/vendor/RequireJS-namespace-undefine.js',
  'js/vendor/URI.min.js',
  'js/vendor/backbone.js'
]

# main_vendor_js remapping to _includes folder
main_vendor_js = base_vendor_js + [
  'js/vendor/json2.js',
  'js/vendor/jquery-ui.min.js',
  'js/vendor/jquery.qtip.min.js',
  'js/vendor/jquery.ba-bbq.min.js',
]

# Common files remapping to _includes folder (used by both RequireJS code and non-RequireJS code)
base_application_js = [
  'js/vendor/openedx/utility.js',
  'js/vendor/openedx/logger.js',
  'js/vendor/openedx/user_dropdown_v1.js',  # Custom dropdown keyboard handling for legacy pages (very likely not in use on gymnasium)
  'js/vendor/openedx/dialog_tab_controls.js',
  'js/vendor/openedx/string_utils.js',
  'js/vendor/openedx/form.ext.js',
  'js/vendor/openedx/ie_shim.js',
  'js/vendor/openedx/accessibility_tools.js',
  'js/vendor/openedx/toggle_login_modal.js',
  'js/vendor/openedx/lang_edx.js',
]

# Dashboard JS
dashboard_js = (
  'js/vendor/openedx/dashboard/credit.js'
  'js/vendor/openedx/dashboard/donation.js'
  'js/vendor/openedx/dashboard/dropdown.js'
  'js/vendor/openedx/dashboard/legacy.js'
  'js/vendor/openedx/dashboard/track_events.js'
)

# Discussion JS
discussion_js = (
  'js/vendor/openedx/discussion/mathjax/mathjax_include.js'
  'js/vendor/openedx/discussion/mathjax/customwmd.js'
  'js/vendor/openedx/discussion/mathjax/mathjax_accessible.js'
  'js/vendor/openedx/discussion/mathjax/mathjax_delay_renderer.js'
  'js/vendor/openedx/discussion/content.js'
  'js/vendor/openedx/discussion/discussion.js'
  'js/vendor/openedx/discussion/utils.js'
  'js/vendor/openedx/discussion/models/discussion_course_settings.js'
  'js/vendor/openedx/discussion/models/discussion_user.js'
  'js/vendor/openedx/discussion/views/discussion_content_view.js'
  'js/vendor/openedx/discussion/views/discussion_inline_view.js'
  'js/vendor/openedx/discussion/views/discussion_thread_edit_view.js'
  'js/vendor/openedx/discussion/views/discussion_thread_list_view.js'
  'js/vendor/openedx/discussion/views/discussion_thread_profile_view.js'
  'js/vendor/openedx/discussion/views/discussion_thread_show_view.js'
  'js/vendor/openedx/discussion/views/discussion_thread_view.js'
  'js/vendor/openedx/discussion/views/discussion_topic_menu_view.js'
  'js/vendor/openedx/discussion/views/new_post_view.js'
  'js/vendor/openedx/discussion/views/response_comment_edit_view.js'
  'js/vendor/openedx/discussion/views/response_comment_show_view.js'
  'js/vendor/openedx/discussion/views/response_comment_view.js'
  'js/vendor/openedx/discussion/views/thread_response_edit_view.js'
  'js/vendor/openedx/discussion/views/thread_response_show_view.js'
  'js/vendor/openedx/discussion/views/thread_response_view.js'
)

discussion_vendor_js = [
  'js/vendor/Markdown.Converter.js',
  'js/vendor/Markdown.Sanitizer.js',
  'js/vendor/Markdown.Editor.js',
  'js/vendor/jquery.timeago.js',
  'js/vendor/jquery.timeago.locale.js',
  'js/vendor/jquery.truncate.js',
  'js/vendor/jquery.ajaxfileupload.js',
  'js/vendor/split.js'
]

notes_js = [
  'js/vendor/openedx/notes.js'
]

instructor_dash_js = [
  'js/vendor/openedx/instructor_dashboard/certificates.js'
  'js/vendor/openedx/instructor_dashboard/cohort_management.js'
  'js/vendor/openedx/instructor_dashboard/course_info.js'
  'js/vendor/openedx/instructor_dashboard/data_download.js'
  'js/vendor/openedx/instructor_dashboard/discussion_management.js'
  'js/vendor/openedx/instructor_dashboard/e-commerce.js'
  'js/vendor/openedx/instructor_dashboard/ecommerce.js'
  'js/vendor/openedx/instructor_dashboard/extensions.js'
  'js/vendor/openedx/instructor_dashboard/instructor_dashboard.js'
  'js/vendor/openedx/instructor_dashboard/membership.js'
  'js/vendor/openedx/instructor_dashboard/metrics.js'
  'js/vendor/openedx/instructor_dashboard/open_response_assessment.js'
  'js/vendor/openedx/instructor_dashboard/proctoring.js'
  'js/vendor/openedx/instructor_dashboard/send_email.js'
  'js/vendor/openedx/instructor_dashboard/student_admin.js'
  'js/vendor/openedx/instructor_dashboard/util.js'
]

# TODO: unused by Gymnasium(?)
verify_student_js = [
    'js/sticky_filter.js',
    'js/query-params.js',
    'js/verify_student/models/verification_model.js',
    'js/verify_student/views/error_view.js',
    'js/verify_student/views/image_input_view.js',
    'js/verify_student/views/webcam_photo_view.js',
    'js/verify_student/views/step_view.js',
    'js/verify_student/views/intro_step_view.js',
    'js/verify_student/views/make_payment_step_view.js',
    'js/verify_student/views/payment_confirmation_step_view.js',
    'js/verify_student/views/face_photo_step_view.js',
    'js/verify_student/views/id_photo_step_view.js',
    'js/verify_student/views/review_photos_step_view.js',
    'js/verify_student/views/enrollment_confirmation_step_view.js',
    'js/verify_student/views/pay_and_verify_view.js',
    'js/verify_student/pay_and_verify.js',
]

# TODO: unused by Gymnasium(?)
reverify_js = [
    'js/verify_student/views/error_view.js',
    'js/verify_student/views/image_input_view.js',
    'js/verify_student/views/webcam_photo_view.js',
    'js/verify_student/views/step_view.js',
    'js/verify_student/views/face_photo_step_view.js',
    'js/verify_student/views/id_photo_step_view.js',
    'js/verify_student/views/review_photos_step_view.js',
    'js/verify_student/views/reverify_success_step_view.js',
    'js/verify_student/models/verification_model.js',
    'js/verify_student/views/reverify_view.js',
    'js/verify_student/reverify.js',
]

# TODO: unused by Gymnasium(?)
incourse_reverify_js = [
    'js/verify_student/views/error_view.js',
    'js/verify_student/views/image_input_view.js',
    'js/verify_student/views/webcam_photo_view.js',
    'js/verify_student/models/verification_model.js',
    'js/verify_student/views/incourse_reverify_view.js',
    'js/verify_student/incourse_reverify.js',
]

ccx_js = sorted(rooted_glob(PROJECT_ROOT / 'static', 'js/ccx/**/*.js'))

certificates_web_view_js = [
    'common/js/vendor/jquery.js',
    'common/js/vendor/jquery-migrate.js',
    'js/vendor/jquery.cookie.js',
    'js/src/logger.js',
    'js/utils/facebook.js',
]

credit_web_view_js = [
    'common/js/vendor/jquery.js',
    'common/js/vendor/jquery-migrate.js',
    'js/vendor/jquery.cookie.js',
    'js/src/logger.js',
]

common_js = [
    'js/src/ajax_prefix.js',
    'js/src/jquery.immediateDescendents.js',
    'js/src/xproblem.js',
]
xblock_runtime_js = [
    'common/js/xblock/core.js',
    'common/js/xblock/runtime.v1.js',
    'lms/js/xblock/lms.runtime.v1.js',
]
lms_application_js = [
    'js/calculator.js',
    'js/feedback_form.js',
    'js/main.js',
]

PIPELINE_JS = {
    'base_application': {
        'source_filenames': base_application_js,
        'output_filename': 'js/lms-base-application.js',
    },
    'application': {
        'source_filenames': (
            common_js + xblock_runtime_js + base_application_js + lms_application_js +
            [
                'js/sticky_filter.js',
                'js/query-params.js',
                'common/js/vendor/moment-with-locales.js',
                'common/js/vendor/moment-timezone-with-data.js',
            ]
        ),
        'output_filename': 'js/lms-application.js',
    },
    'proctoring': {
        'source_filenames': proctoring_js,
        'output_filename': 'js/lms-proctoring.js',
    },
    'courseware': {
        'source_filenames': courseware_js,
        'output_filename': 'js/lms-courseware.js',
    },
    'base_vendor': {
        'source_filenames': base_vendor_js,
        'output_filename': 'js/lms-base-vendor.js',
    },
    'main_vendor': {
        'source_filenames': main_vendor_js,
        'output_filename': 'js/lms-main_vendor.js',
    },
    'module-descriptor-js': {
        'source_filenames': rooted_glob(COMMON_ROOT / 'static/', 'xmodule/descriptors/js/*.js'),
        'output_filename': 'js/lms-module-descriptors.js',
    },
    'module-js': {
        'source_filenames': rooted_glob(COMMON_ROOT / 'static', 'xmodule/modules/js/*.js'),
        'output_filename': 'js/lms-modules.js',
    },
    'discussion': {
        'source_filenames': discussion_js,
        'output_filename': 'js/discussion.js',
    },
    'discussion_vendor': {
        'source_filenames': discussion_vendor_js,
        'output_filename': 'js/discussion_vendor.js',
    },
    'notes': {
        'source_filenames': notes_js,
        'output_filename': 'js/notes.js',
    },
    'instructor_dash': {
        'source_filenames': instructor_dash_js,
        'output_filename': 'js/instructor_dash.js',
    },
    'dashboard': {
        'source_filenames': dashboard_js,
        'output_filename': 'js/dashboard.js'
    },
    'verify_student': {
        'source_filenames': verify_student_js,
        'output_filename': 'js/verify_student.js'
    },
    'reverify': {
        'source_filenames': reverify_js,
        'output_filename': 'js/reverify.js'
    },
    'incourse_reverify': {
        'source_filenames': incourse_reverify_js,
        'output_filename': 'js/incourse_reverify.js'
    },
    'ccx': {
        'source_filenames': ccx_js,
        'output_filename': 'js/ccx.js'
    },
    'footer_edx': {
        'source_filenames': ['js/footer-edx.js'],
        'output_filename': 'js/footer-edx.js'
    },
    'certificates_wv': {
        'source_filenames': certificates_web_view_js,
        'output_filename': 'js/certificates/web_view.js'
    },
    'credit_wv': {
        'source_filenames': credit_web_view_js,
        'output_filename': 'js/credit/web_view.js'
    }
}


STATICFILES_IGNORE_PATTERNS = (
    "*.py",
    "*.pyc",

    # It would be nice if we could do, for example, "**/*.scss",
    # but these strings get passed down to the `fnmatch` module,
    # which doesn't support that. :(
    # http://docs.python.org/2/library/fnmatch.html
    "sass/*.scss",
    "sass/*/*.scss",
    "sass/*/*/*.scss",
    "sass/*/*/*/*.scss",

    # Ignore tests
    "spec",
    "spec_helpers",

    # Symlinks used by js-test-tool
    "xmodule_js",
)


################################# DJANGO-REQUIRE ###############################

# The baseUrl to pass to the r.js optimizer, relative to STATIC_ROOT.
REQUIRE_BASE_URL = "./"

# The name of a build profile to use for your project, relative to REQUIRE_BASE_URL.
# A sensible value would be 'app.build.js'. Leave blank to use the built-in default build profile.
# Set to False to disable running the default profile (e.g. if only using it to build Standalone
# Modules)
REQUIRE_BUILD_PROFILE = "lms/js/build.js"

# The name of the require.js script used by your project, relative to REQUIRE_BASE_URL.
REQUIRE_JS = "common/js/vendor/require.js"

# Whether to run django-require in debug mode.
REQUIRE_DEBUG = False

# In production, the Django pipeline appends a file hash to JavaScript file names.
# This makes it difficult for RequireJS to load its requirements, since module names
# specified in JavaScript code do not include the hash.
# For this reason, we calculate the actual path including the hash on the server
# when rendering the page.  We then override the default paths provided to RequireJS
# so it can resolve the module name to the correct URL.
#
# If you want to load JavaScript dependencies using RequireJS
# but you don't want to include those dependencies in the JS bundle for the page,
# then you need to add the js urls in this list.
REQUIRE_JS_PATH_OVERRIDES = {
    'course_bookmarks/js/views/bookmark_button': 'course_bookmarks/js/views/bookmark_button.js',
    'js/views/message_banner': 'js/views/message_banner.js',
    'moment': 'common/js/vendor/moment-with-locales.js',
    'moment-timezone': 'common/js/vendor/moment-timezone-with-data.js',
    'js/courseware/course_info_events': 'js/courseware/course_info_events.js',
    'js/courseware/accordion_events': 'js/courseware/accordion_events.js',
    'js/dateutil_factory': 'js/dateutil_factory.js',
    'js/courseware/link_clicked_events': 'js/courseware/link_clicked_events.js',
    'js/courseware/toggle_element_visibility': 'js/courseware/toggle_element_visibility.js',
    'js/student_account/logistration_factory': 'js/student_account/logistration_factory.js',
    'js/courseware/courseware_factory': 'js/courseware/courseware_factory.js',
    'js/groups/views/cohorts_dashboard_factory': 'js/groups/views/cohorts_dashboard_factory.js',
    'js/groups/discussions_management/discussions_dashboard_factory': 'js/discussions_management/views/discussions_dashboard_factory.js',
    'draggabilly': 'js/vendor/draggabilly.js',
    'hls': 'common/js/vendor/hls.js'
}

########################## DJANGO WEBPACK LOADER ##############################

WEBPACK_LOADER = {
    'DEFAULT': {
        'BUNDLE_DIR_NAME': 'bundles/',
        'STATS_FILE': os.path.join(STATIC_ROOT, 'webpack-stats.json')
    }
}
WEBPACK_CONFIG_PATH = 'webpack.prod.config.js'

### TODO: determine which JS modules are loaded by webpack and add them.
