package com.example.katerina.gameapplication;

import android.app.Activity;
import android.content.pm.ActivityInfo;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.WebView;


public abstract class BaseGame extends Fragment {

    protected abstract String getGamePath();

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View rootView = inflater.inflate(R.layout.screen_game_one, container,
                false);
        Activity a = getActivity();
        if(a != null) a.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);

        WebView gameOne = (WebView) rootView.findViewById(R.id.webViewGameOne);
        gameOne.getSettings().setUseWideViewPort(true);
        gameOne.setInitialScale(1);
        gameOne.getSettings().setJavaScriptEnabled(true);
        gameOne.loadUrl(getGamePath());
        return rootView;
    }

}