const { Adw, Gio, Gtk } = imports.gi;
const ExtensionUtils = imports.misc.extensionUtils;
const Gettext = imports.gettext;
const Me = ExtensionUtils.getCurrentExtension();

const Domain = Gettext.domain(Me.metadata.uuid);
const _ = Domain.gettext;

function newRow(settings, group, title, key) {
    const actionRow = new Adw.ActionRow({
        title: title,
    });
    group.add(actionRow);
    const switcher = new Gtk.Switch({
        active: settings.get_boolean(key),
        valign: Gtk.Align.CENTER,
    });
    actionRow.add_suffix(switcher);
    actionRow.set_activatable_widget(switcher);
    settings.bind(key, switcher, 'active', Gio.SettingsBindFlags.DEFAULT);
}

function init() {
    ExtensionUtils.initTranslations(Me.metadata.uuid);
}

function fillPreferencesWindow(window) {
    const settings = ExtensionUtils.getSettings
    ('org.gnome.shell.extensions.dynamic-calendar-and-clocks-icons');
    const page = new Adw.PreferencesPage();
    window.add(page);
    const calendarGroup = new Adw.PreferencesGroup({
        title: _('Calendar'),
    });
    page.add(calendarGroup);
    newRow(settings, calendarGroup, _('Dynamic Calendar Icon'), 'calendar');
    newRow(settings, calendarGroup, _('Show Weekday'), 'show-weekday');
    newRow(settings, calendarGroup, _('Show Month'), 'show-month');
    const clocksGroup = new Adw.PreferencesGroup({
        title: _('Clocks'),
    });
    page.add(clocksGroup);
    newRow(settings, clocksGroup, _('Dynamic Clocks Icon'), 'clocks');
    newRow(settings, clocksGroup, _('Show Seconds'), 'show-seconds');
}
